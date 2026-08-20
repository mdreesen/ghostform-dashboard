<script setup lang="ts">
/**
 * Guided tour — spotlight + tooltip walkthrough of the dashboard.
 *
 * No dependency: positioning is done from getBoundingClientRect(), and the
 * spotlight is a huge box-shadow around a transparent rect (the cleanest way
 * to "cut a hole" in an overlay without SVG masks).
 *
 * Steps target elements by a `data-tour="key"` attribute. A step whose target
 * isn't on the page is skipped automatically, so the tour degrades gracefully
 * when a section is empty (e.g. no leads yet).
 */

interface TourStep {
  target?: string          // data-tour key; omit for a centered message
  title: string
  body: string
  /** where to put the tooltip relative to the target */
  placement?: 'bottom' | 'top' | 'auto'
}

const props = defineProps<{
  /** run automatically on mount (new users) */
  auto?: boolean
}>()

const steps: TourStep[] = [
  {
    title: 'Welcome to GhostForm',
    body: "Two minutes and you'll know where everything lives. You can leave at any point — there's a link to restart this in your profile.",
  },
  {
    target: 'briefing',
    title: 'Start your day here',
    body: 'Every morning this lists exactly who needs you: brand-new leads, follow-ups you scheduled, and anyone who has gone quiet. Work top to bottom.',
    placement: 'bottom'
  },
  {
    target: 'lead-actions',
    title: 'Two taps per lead',
    body: '“Draft” writes a text or email using what that lead told you. “Contacted” marks them done and clears them off today’s list until they go quiet again.',
    placement: 'top'
  },
  {
    target: 'nav-leads',
    title: 'Everyone you’ve met',
    body: 'Your full list, grouped by where each person stands — new, appointment, under contract, closed.',
    placement: 'bottom'
  },
  {
    target: 'nav-campaigns',
    title: 'Follow-ups that send themselves',
    body: 'Write one email, pick a day and a rhythm, and it goes out to everyone at that stage — weekly, every other week, or monthly.',
    placement: 'bottom'
  },
  {
    target: 'nav-forms',
    title: 'This is the important one',
    body: 'Print a QR code and put it on the table at your next open house. Guests sign in on their own phone — it even works with no cell signal.',
    placement: 'bottom'
  },
  {
    title: 'That’s it',
    body: 'Go print your first QR code. Everything else can wait until you have leads coming in.',
  }
]

const active = ref(false)
const index = ref(0)
const tipEl = ref<HTMLElement | null>(null)
const rect = reactive({ top: 0, left: 0, width: 0, height: 0 })
const hasTarget = ref(false)
const tipStyle = reactive<Record<string, string>>({})
const PAD = 8

const step = computed(() => steps[index.value])
const isLast = computed(() => index.value === steps.length - 1)

function findTarget(key?: string): HTMLElement | null {
  if (!key) return null
  return document.querySelector<HTMLElement>(`[data-tour="${key}"]`)
}

/** Move the spotlight and tooltip to the current step's target. */
async function position() {
  const el = findTarget(step.value?.target)

  if (!el) {
    hasTarget.value = false
    // Centered card for intro/outro steps.
    Object.assign(tipStyle, {
      top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '420px'
    })
    return
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  // Wait for the smooth scroll to settle before measuring.
  await new Promise((r) => setTimeout(r, 380))

  const r = el.getBoundingClientRect()
  hasTarget.value = true
  Object.assign(rect, {
    top: r.top - PAD,
    left: r.left - PAD,
    width: r.width + PAD * 2,
    height: r.height + PAD * 2
  })

  // Measure the tooltip for real rather than assuming a height — the copy
  // varies per step, and guessing made the tooltip overlap the element it was
  // pointing at (and clip off the top of the screen).
  await nextTick()
  const tipH = tipEl.value?.offsetHeight ?? 200
  const tipW = tipEl.value?.offsetWidth ?? 380
  const GAP = 16
  const EDGE = 16

  const fitsBelow = r.bottom + GAP + tipH < window.innerHeight - EDGE
  const fitsAbove = r.top - GAP - tipH > EDGE
  const wantsTop = step.value?.placement === 'top'

  let top: number
  if (wantsTop && fitsAbove) top = r.top - GAP - tipH
  else if (fitsBelow) top = r.bottom + GAP
  else if (fitsAbove) top = r.top - GAP - tipH
  else {
    // Neither side fits (tall target / short viewport): clamp into view and
    // shift horizontally so the tooltip sits beside rather than over it.
    top = Math.max(EDGE, Math.min(window.innerHeight - tipH - EDGE, r.top))
  }

  const left = Math.min(
    Math.max(EDGE, r.left + r.width / 2 - tipW / 2),
    window.innerWidth - tipW - EDGE
  )

  Object.assign(tipStyle, {
    transform: 'none',
    maxWidth: '380px',
    left: `${left}px`,
    top: `${top}px`
  })
}

async function start() {
  index.value = 0
  active.value = true
  await nextTick()
  await position()
}

async function next() {
  if (isLast.value) return finish()
  index.value++
  await nextTick()
  await position()
}

async function back() {
  if (index.value === 0) return
  index.value--
  await nextTick()
  await position()
}

function markSeen() {
  try { localStorage.setItem('ghostform:tourSeen', '1') } catch { /* ignore */ }
  // Also persist to the account so it doesn't reappear on another device.
  $fetch('/api/user/tour', { method: 'POST' }).catch(() => { /* non-critical */ })
}

function finish() {
  active.value = false
  markSeen()
}

function skip() {
  active.value = false
  markSeen()
}

function onKey(e: KeyboardEvent) {
  if (!active.value) return
  if (e.key === 'Escape') skip()
  if (e.key === 'ArrowRight' || e.key === 'Enter') next()
  if (e.key === 'ArrowLeft') back()
}

const reposition = () => { if (active.value) position() }

onMounted(async () => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', reposition)

  if (props.auto) {
    let seen = false
    try { seen = localStorage.getItem('ghostform:tourSeen') === '1' } catch { /* ignore */ }
    if (!seen) {
      // Let the dashboard's own entrance animations finish first.
      setTimeout(() => start(), 900)
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', reposition)
})

// Let other components trigger it: window.dispatchEvent(new Event('gf:tour'))
onMounted(() => window.addEventListener('gf:tour', start))
onBeforeUnmount(() => window.removeEventListener('gf:tour', start))

defineExpose({ start })
</script>

<template>
  <Teleport to="body">
    <Transition name="tour-fade">
      <div v-if="active" class="fixed inset-0 z-[100]">

        <!-- Spotlight: a transparent rect with a giant shadow doing the dimming -->
        <div
          v-if="hasTarget"
          class="absolute pointer-events-none transition-all duration-300 ease-out"
          :style="{
            top: rect.top + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            boxShadow: '0 0 0 9999px rgba(31,27,22,0.62)',
            border: '1px solid rgba(181,86,58,0.9)'
          }"
        />
        <!-- Plain dim for steps with no target -->
        <div
          v-else
          class="absolute inset-0 bg-[#1F1B16]/62"
          @click="skip"
        />

        <!-- Tooltip -->
        <div
          ref="tipEl"
          class="absolute bg-[#F7F4EF] border border-[#DDD6C9] shadow-2xl p-6 w-[calc(100vw-32px)]"
          :style="tipStyle"
        >
          <p class="gf-eyebrow mb-2.5">
            Step {{ index + 1 }} of {{ steps.length }}
          </p>

          <h3 class="font-display text-[20px] font-semibold tracking-tight mb-2.5">
            {{ step?.title }}
          </h3>

          <p class="text-[14px] text-[#8A847C] leading-relaxed mb-6">
            {{ step?.body }}
          </p>

          <!-- progress ticks -->
          <div class="flex gap-1.5 mb-5">
            <span
              v-for="(s, i) in steps"
              :key="i"
              class="h-0.5 flex-1 transition-colors duration-300"
              :class="i <= index ? 'bg-[#B5563A]' : 'bg-[#DDD6C9]'"
            />
          </div>

          <div class="flex items-center justify-between gap-3">
            <button
              class="text-[11px] uppercase tracking-[0.1em] text-[#A9A39A] hover:text-[#1F1B16] transition-colors"
              @click="skip"
            >
              Skip
            </button>

            <div class="flex gap-2.5">
              <button
                v-if="index > 0"
                class="px-4 py-2.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
                @click="back"
              >
                Back
              </button>
              <button
                class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] transition-colors"
                @click="next"
              >
                {{ isLast ? 'Finish' : 'Next' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tour-fade-enter-active,
.tour-fade-leave-active { transition: opacity 0.25s ease; }
.tour-fade-enter-from,
.tour-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .absolute { transition: none !important; }
}
</style>
