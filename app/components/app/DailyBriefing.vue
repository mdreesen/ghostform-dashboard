<script setup lang="ts">
import { PRIORITIES, effectivePriority, whenLabel, toDateInput } from '~/utils/priority'


interface BriefingLead {
  _id: string
  name: string
  email: string
  phone: string
  status: string
  bucket: 'new' | 'overdue' | 'cold'
  reason: string
  daysSinceContact: number | null
  lastContactLabel: string
  priorityScore: number
  best_communication_method?: string
}

interface Briefing {
  generatedAt: string
  totals: { total: number; new: number; overdue: number; cold: number }
  leads: BriefingLead[]
  headline: string
}

const { data: briefing, pending } = useNuxtData<Briefing>('briefing')
const toast = useToast()

const marking = ref<Set<string>>(new Set())
// Leads currently playing the file-away animation, so we can hold them in the
// DOM for the duration instead of yanking them out instantly.
const filing = ref<Set<string>>(new Set())

const VISIBLE_LIMIT = 8
const showAll = ref(false)
const visibleLeads = computed(() => {
  const all = briefing.value?.leads ?? []
  return showAll.value ? all : all.slice(0, VISIBLE_LIMIT)
})

// Terracotta square variants carry the status — filled / hollow / faint.
const bucketMeta: Record<BriefingLead['bucket'], { label: string; sq: string }> = {
  overdue: { label: 'Overdue', sq: 'bg-[#B5563A]' },
  new:     { label: 'New',     sq: 'bg-transparent border-[1.5px] border-[#C9866F]' },
  cold:    { label: 'Cold',    sq: 'bg-[#A9A39A]' }
}

/** Remove a lead from the list + totals (used by both actions). */
function dropLead(leadId: string) {
  if (!briefing.value) return
  const lead = briefing.value.leads.find((l) => l._id === leadId)
  if (!lead) return
  briefing.value.leads = briefing.value.leads.filter((l) => l._id !== leadId)
  briefing.value.totals.total = Math.max(0, briefing.value.totals.total - 1)
  briefing.value.totals[lead.bucket] = Math.max(0, briefing.value.totals[lead.bucket] - 1)
}

/** Play the file-away animation, then actually remove. */
function fileAway(leadId: string) {
  filing.value.add(leadId)
  setTimeout(() => {
    dropLead(leadId)
    filing.value.delete(leadId)
  }, 620)
}

/** The composer sent a message — server already stamped contact. */
function onLeadSent(leadId: string) {
  fileAway(leadId)
}

async function markContacted(lead: BriefingLead) {
  if (!briefing.value || marking.value.has(lead._id)) return

  const prevLeads = briefing.value.leads
  const prevTotals = { ...briefing.value.totals }

  marking.value.add(lead._id)

  try {
    // The WRITE is the only thing that decides success or failure.
    await $fetch(`/api/leads/${lead._id}/contacted`, { method: 'POST' });
  } catch {
    // The write genuinely failed — put the lead back and say so.
    if (briefing.value) {
      briefing.value.leads = prevLeads
      briefing.value.totals = prevTotals
    }
    toast.error('Could not update. Please try again.')
    marking.value.delete(lead._id)
    return
  }

  toast.success(`Marked ${lead.name} as contacted`)
  fileAway(lead._id);

  // Refresh AFTER the write is confirmed, and deliberately outside the
  // try above. A refresh is a nice-to-have: if it fails (network blip, a
  // Mongo hiccup) the contact is already saved, so resurrecting the lead
  // would be wrong and confusing.
  //
  // This was the bug — refreshNuxtData sat inside the same try/catch, so a
  // failed REFRESH triggered the rollback for a write that had already
  // succeeded. The lead reappeared right after a success toast.
  try {
    await Promise.all([
      refreshNuxtData('leads'),
      refreshNuxtData('briefing')
    ])
  } catch (err) {
    console.error('[briefing] refresh after contact failed (contact was saved):', err)
  } finally {
    marking.value.delete(lead._id)
  }
}

/**
 * Confirmed document deadlines, shown ABOVE the call list.
 *
 * A contingency expiring today outranks any follow-up — miss it and the deal
 * is gone, whereas a lead can be called tomorrow. Only confirmed deadlines
 * appear; an unconfirmed extraction is a guess and belongs on the document,
 * not in the morning briefing.
 */
/**
 * Deadlines.
 *
 * WHY THIS IS CLIENT-SIDE ONLY:
 * On a hard reload the SSR pass fetches from the server, where the browser's
 * session cookie isn't attached — so /api/documents/deadlines returned 401 and
 * `default` quietly turned that into an empty list. Deadlines vanished on
 * reload and reappeared on client navigation, which is exactly the symptom.
 *
 * `server: false` skips SSR entirely, so the request always runs in the
 * browser with the cookie present. The rest of this component already works
 * this way — the page wraps it in <ClientOnly>.
 *
 * The alternative (forwarding headers with useRequestHeaders) would also work,
 * but there's nothing to gain from rendering deadlines on the server when the
 * component around them is client-only anyway.
 */
const { data: deadlineData, status: deadlineStatus } = useFetch<any>('/api/documents/deadlines', {
  key: 'briefing-deadlines',
  server: false,
  lazy: true,
  // No `default` — an empty object and a failed request must stay
  // distinguishable, or the next auth bug hides itself the same way.
  onResponseError({ response }) {
    console.error('[briefing] deadlines request failed:', response.status)
  }
})
const deadlines = computed(() => deadlineData.value?.items ?? [])

/**
 * Self-set reminders, shown alongside contract deadlines.
 *
 * Unconfirmed ones ARE shown, flagged — unlike deadlines, which stay hidden
 * until confirmed. Someone who spoke a reminder an hour ago already knows about
 * it; hiding it would look like the app ignored them.
 */
const { data: reminderData } = useFetch<any[]>('/api/reminders', {
  key: 'reminders',
  server: false,   // authenticated — no session cookie during SSR
  lazy: true
})
const reminders = computed(() =>
  (reminderData.value ?? []).filter((r: any) => r.daysUntil <= 3)
)

const busyReminder = ref<string | null>(null)
async function actOnReminder(r: any, action: string) {
  busyReminder.value = r._id
  try {
    await $fetch(`/api/reminders/${r._id}`, { method: 'POST', body: { action } })
    await refreshNuxtData('reminders')
  } catch {
    toast.error('Could not update that reminder.')
  } finally {
    busyReminder.value = null
  }
}
/** Distinguish "still loading" from "genuinely none" so nothing flashes. */
const deadlinesLoading = computed(() => deadlineStatus.value === 'pending')
const urgentDeadlines = computed(() => deadlines.value.filter((d: any) => d.daysUntil <= 3))

function deadlineStyle(d: any) {
  return PRIORITIES[effectivePriority(d.date, d.priority)]
}

/**
 * Acting on a deadline from the briefing itself.
 *
 * Seeing it at 7am and having to navigate to the property, find the document
 * and mark it there is three steps too many for a morning routine — so it
 * doesn't get done, and the list stops reflecting reality.
 */
const busyDeadline = ref<string | null>(null)
const reschedule = ref<string | null>(null)
const newDate = ref('')

async function actOnDeadline(d: any, action: string, extra: Record<string, any> = {}) {
  busyDeadline.value = d.deadlineId
  try {
    await $fetch(`/api/documents/${d.documentId}/deadline`, {
      method: 'POST',
      body: { deadlineId: d.deadlineId, action, ...extra }
    })
    reschedule.value = null
    await refreshNuxtData('briefing-deadlines')
    // The document list shows the same deadline, so it's stale too.
    await refreshNuxtData(`docs-${d.homeId || d.leadId || 'all'}`)
  } catch {
    toast.error('Could not update that deadline.')
  } finally {
    busyDeadline.value = null
  }
}

/**
 * What this deadline is FOR, in the words a realtor thinks in.
 * The property address first — that's how they hold a deal in their head.
 * Falls back to the lead, then the filename, so it's never blank.
 */
function subjectOf(d: any): string {
  return d.propertyAddress || d.propertyName || d.leadName || d.filename || 'Unattached'
}

/** Grouped by property so a deal reads as one block, not scattered rows. */
const deadlineGroups = computed(() => {
  const groups = new Map<string, { subject: string; homeId?: string; items: any[] }>()
  for (const d of urgentDeadlines.value) {
    const subject = subjectOf(d)
    if (!groups.has(subject)) groups.set(subject, { subject, homeId: d.homeId, items: [] })
    groups.get(subject)!.items.push(d)
  }
  return [...groups.values()]
})

function beginReschedule(d: any) {
  reschedule.value = d.deadlineId
  newDate.value = toDateInput(d.date)
}
</script>

<template>
  <div class="w-full">
    <!-- Section header -->
    <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
      <span class="h-label">01 — Today</span>
      <span class="font-display gf-title font-semibold tracking-tight">Who to reach</span>
    </div>

    <!-- Headline -->
    <p
      v-if="pending && !briefing"
      class="font-display text-[30px] leading-[1.32] max-w-[24ch] mb-11 text-[#8A847C]"
    >
      Building your list…
    </p>
    <p
      v-else
      class="font-display gf-title sm:text-[30px] leading-[1.32] max-w-[26ch] mb-11"
    >
      {{ briefing?.headline }}
    </p>

    <!-- Document deadlines. Above the leads deliberately — a contingency
         expiring today can't wait for the call list. -->
    <!-- Two columns above 1000px. The call list gets the wide one because
         it's what the realtor opened this screen for; deadlines, reminders
         and the sphere are context beside it rather than competing below. -->
    <div class="db-grid">
      <div>
        <!-- Ranked list -->
    <div v-if="briefing?.leads?.length">
      <div
        v-for="lead in visibleLeads"
        :key="lead._id"
        class="gf-lead group grid items-center gap-4 sm:gap-6 border-t border-[#DDD6C9] last:border-b py-6 pl-1.5 pr-3 relative transition-colors duration-300 hover:bg-[#DDD6C9]/30"
        :class="filing.has(lead._id) ? 'gf-filing' : ''"
      >
        <!-- rust bar grows on hover -->
        <span
          class="absolute left-0 top-0 bottom-0 w-0.5 bg-[#4C5741] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"
        />

        <span class="gf-ref hidden sm:block gf-label tracking-[0.1em] text-[#A9A39A] tabular-nums">
          № {{ lead._id.slice(-4).toUpperCase() }}
        </span>

        <span class="gf-marker flex items-center gap-2.5">
          <span class="w-[7px] h-[7px] shrink-0 transition-transform" :class="bucketMeta[lead.bucket].sq" />
          <span class="gf-label uppercase tracking-[0.14em] text-[#8A847C]">
            {{ bucketMeta[lead.bucket].label }}
          </span>
        </span>

        <NuxtLink :to="`/dashboard/leads/${lead._id}/details`" class="gf-main min-w-0">
          <p class="font-display gf-lead font-semibold tracking-tight mb-0.5 truncate group-hover:text-[#4C5741] transition-colors">
            {{ lead.name }}
          </p>
          <p class="gf-meta text-[#8A847C] truncate">
            {{ lead.reason }} · {{ lead.lastContactLabel }}
          </p>
        </NuxtLink>

        <div
          class="gf-actions flex gap-2.5"
          :data-tour="lead._id === visibleLeads[0]?._id ? 'lead-actions' : undefined"
        >
          <appLeadMessageComposer
            :lead-id="lead._id"
            :lead-name="lead.name"
            :lead-phone="lead.phone"
            @sent="onLeadSent"
          />
          <button
            :disabled="marking.has(lead._id)"
            class="gf-pair-btn border-[#1F1B16] text-[#1F1B16] hover:bg-[#1F1B16] hover:text-[#F7F4EF] disabled:opacity-40 disabled:cursor-not-allowed"
            @click="markContacted(lead)"
          >
            {{ marking.has(lead._id) ? 'Saving…' : 'Contacted' }}
          </button>
        </div>
      </div>

      <button
        v-if="briefing.leads.length > VISIBLE_LIMIT"
        class="mt-8 gf-eyebrow hover:text-[#4C5741] transition-colors"
        @click="showAll = !showAll"
      >
        {{ showAll ? '— Show less' : `— Show all ${briefing.leads.length}` }}
      </button>
    </div>

    <!-- Caught up -->
    <div v-else-if="!pending" class="border-t border-b border-[#DDD6C9] py-14 text-center">
      <p class="gf-body text-[#8A847C]">
        Nothing needs a follow-up right now. New and cold leads appear here automatically.
      </p>
    </div>

    <!-- Below the call list, deliberately.
         Contract deadlines and today's people are time-bound. These two are
         valuable but never urgent — putting them above the call list would
         bury the thing the realtor opened this screen for.

         Order between them matters too: the closing prompt comes first because
         answering it is what FILLS the sphere list underneath. -->
      </div>

      <aside class="db-stack">
    <section v-if="urgentDeadlines.length" class="mb-11">
      <p class="h-label mb-4">Deadlines</p>

      <!-- Grouped by property. A realtor holds a deal in their head as an
           address, so three deadlines on one house should read as one block
           rather than three unrelated rows. -->
      <div
        v-for="group in deadlineGroups" :key="group.subject"
        class="border-t border-[#DDD6C9] last:border-b py-5"
      >
        <div class="flex items-baseline justify-between gap-4 mb-3">
          <NuxtLink
            v-if="group.homeId"
            :to="`/dashboard/home/${group.homeId}`"
            class="font-display gf-lead font-semibold tracking-tight hover:text-[#4C5741] transition-colors truncate"
          >
            {{ group.subject }}
          </NuxtLink>
          <p v-else class="font-display gf-lead font-semibold tracking-tight truncate">
            {{ group.subject }}
          </p>
          <span class="gf-label uppercase tracking-[0.1em] text-[#A9A39A] shrink-0">
            {{ group.items.length }} {{ group.items.length === 1 ? 'deadline' : 'deadlines' }}
          </span>
        </div>

        <div
          v-for="d in group.items" :key="d.deadlineId"
          class="flex items-start gap-3.5 py-2.5"
        >
          <span
            class="w-2.5 h-2.5 mt-1.5 shrink-0"
            :style="{
              background: deadlineStyle(d).shape === 'filled' ? deadlineStyle(d).color : 'transparent',
              border: `1.5px solid ${deadlineStyle(d).color}`
            }"
          />
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-baseline gap-x-2.5 gf-truncate">
              <p class="gf-body leading-snug">{{ d.label }}</p>
              <span
                class="gf-meta font-semibold shrink-0"
                :style="{ color: deadlineStyle(d).color }"
              >
                {{ whenLabel(d.date) }}
              </span>
            </div>

            <!-- Document TYPE, not filename. "Purchase agreement" is what they
                 know it as; "purchase-agreement-TEST.pdf" is what we called it. -->
            <p class="gf-meta text-[#A9A39A] mt-0.5">
              {{ d.docType || d.filename }}
              <template v-if="d.leadName && d.propertyAddress"> · {{ d.leadName }}</template>
            </p>

            <div v-if="reschedule === d.deadlineId" class="flex flex-wrap items-center gap-2 mt-2.5">
              <input
                v-model="newDate" type="date"
                class="bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-1.5 gf-meta focus:outline-none focus:border-[#4C5741]"
              />
              <button
                class="gf-meta font-semibold text-[#4C5741] hover:underline disabled:opacity-40"
                :disabled="busyDeadline === d.deadlineId"
                @click="actOnDeadline(d, 'confirm', { date: newDate })"
              >
                Save
              </button>
              <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="reschedule = null">
                Cancel
              </button>
            </div>

            <div v-else class="gf-row-actions mt-2">
              <button
                class="gf-label uppercase tracking-[0.08em] font-semibold px-3 py-1.5 border border-[#5A6349] text-[#5A6349] hover:bg-[#5A6349] hover:text-[#F7F4EF] transition-colors disabled:opacity-40"
                :disabled="busyDeadline === d.deadlineId"
                @click="actOnDeadline(d, 'complete')"
              >
                {{ busyDeadline === d.deadlineId ? 'Saving…' : 'Done' }}
              </button>
              <button
                class="gf-meta text-[#8A847C] hover:text-[#1F1B16] transition-colors"
                @click="beginReschedule(d)"
              >
                Date changed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Self-set reminders. Separate from contract deadlines because they
         are a different kind of obligation, but in the same place because the
         realtor shouldn't have to look twice. -->

    <section v-if="reminders.length" class="mb-11">
      <p class="h-label mb-4">Reminders</p>
      <div
        v-for="r in reminders" :key="r._id"
        class="gf-row"
      >
        <span
          class="w-2.5 h-2.5 mt-1.5 shrink-0"
          :style="{
            background: r.daysUntil <= 0 ? '#C0392B' : 'transparent',
            border: `1.5px solid ${r.daysUntil <= 0 ? '#C0392B' : '#C08A2E'}`
          }"
        />
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-baseline gap-x-2.5 gf-truncate">
            <p class="gf-body leading-snug">{{ r.text }}</p>
            <span class="gf-meta font-semibold" :style="{ color: r.daysUntil <= 0 ? '#C0392B' : '#C08A2E' }">
              {{ whenLabel(r.dueAt) }}
            </span>
          </div>
          <p class="gf-label gf-muted mt-0.5">
            <template v-if="r.propertyAddress">{{ r.propertyAddress }} · </template>
            <template v-if="r.source === 'voice'">From a voice note</template>
            <template v-else>You set this</template>
            <template v-if="!r.confirmed"> · not confirmed yet</template>
          </p>

          <div class="gf-row-actions mt-2">
            <button
              class="gf-label uppercase tracking-[0.08em] font-semibold px-3 py-1.5 border border-[#5A6349] text-[#5A6349] hover:bg-[#5A6349] hover:text-[#F7F4EF] transition-colors disabled:opacity-40"
              :disabled="busyReminder === r._id"
              @click="actOnReminder(r, 'complete')"
            >
              {{ busyReminder === r._id ? 'Saving…' : 'Done' }}
            </button>
            <button
              v-if="!r.confirmed"
              class="gf-meta text-[#8A847C] hover:text-[#1F1B16]"
              @click="actOnReminder(r, 'confirm')"
            >
              That's right
            </button>
            <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="actOnReminder(r, 'dismiss')">
              Remove
            </button>
          </div>
        </div>
      </div>
    </section>

        <appClosingPrompt />
        <appSphereList />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.gf-lead {
  grid-template-columns: 1fr auto;
  transform-style: preserve-3d;
  transition: background-color .3s ease, transform .4s cubic-bezier(.16, 1, .3, 1);
}
.gf-lead:hover { transform: translateZ(18px); }

@media (min-width: 640px) {
  .gf-lead { grid-template-columns: 58px 96px 1fr auto; }
}
@media (max-width: 639px) {
  .gf-marker { grid-column: 1; }
  .gf-main { grid-column: 1 / -1; }
  .gf-actions { grid-column: 1 / -1; }
}

/* the lead rotates away into depth as it's filed */
.gf-filing {
  animation: gfFileAway .62s cubic-bezier(.4, 0, .6, 1) forwards;
  pointer-events: none;
}
@keyframes gfFileAway {
  0%   { opacity: 1; transform: translateX(0) rotateY(0) translateZ(0); max-height: 140px; }
  45%  { opacity: 0; transform: translateX(40px) rotateY(22deg) translateZ(-90px); }
  100% { opacity: 0; transform: translateX(40px) rotateY(22deg) translateZ(-90px);
         max-height: 0; padding-top: 0; padding-bottom: 0; border-width: 0; }
}
.gf-filing .gf-marker span:first-child {
  animation: gfSpinSq .55s cubic-bezier(.34, 1.56, .64, 1);
}
@keyframes gfSpinSq {
  0%   { transform: rotate(0) scale(1); }
  50%  { transform: rotate(180deg) scale(2.4); }
  100% { transform: rotate(360deg) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .gf-lead:hover { transform: none; }
  .gf-filing { animation-duration: .001ms; }
}
</style>
