<script setup lang="ts">
/**
 * Campaign email builder.
 *
 * Blocks on the left, live preview on the right — rendered by the SAME
 * function that sends, so what you see is what arrives. A separate preview
 * renderer would drift from the real one within a month.
 */
const props = defineProps<{ modelValue: any[]; heading?: string; preheader?: string }>()
const toast = useToast()
const sendingTest = ref(false)

/**
 * The preview is a browser, not a mail client. Gmail strips things, Outlook
 * renders with Word, images get blocked. This is the last check before a
 * campaign reaches real people.
 */
async function sendTest() {
  if (!props.heading) {
    toast.add({ title: 'Add a subject line first.', color: 'error', duration: 8000 })
    return
  }
  sendingTest.value = true
  try {
    const r = await $fetch<{ sentTo: string }>('/api/campaigns/send-test', {
      method: 'POST',
      body: { subject: props.heading, preheader: props.preheader, blocks: props.modelValue }
    })
    toast.add({ title: `Test sent to ${r.sentTo}`, color: 'success' })
  } catch (err: any) {
    toast.add({ title: err?.data?.message || 'Could not send the test.', color: 'error', duration: 8000 })
  } finally {
    sendingTest.value = false
  }
}
const emit = defineEmits<{ 'update:modelValue': [any[]] }>()

const blocks = computed({
  get: () => props.modelValue ?? [],
  set: (v) => emit('update:modelValue', v)
})

const html = ref('')
const rendering = ref(false)

/**
 * The merge tags, as plain strings.
 *
 * Writing `{{ '{{name}}' }}` in the template does not work — Vue's parser
 * reads the inner `}}` as the end of the interpolation and throws
 * "Unterminated string constant". Declaring them here avoids the template
 * parser seeing braces at all.
 */
const TAG_NAME = '{' + '{name}' + '}'
const TAG_AGENT = '{' + '{agent}' + '}'

const TYPES = [
  { type: 'text', label: 'Paragraph' },
  { type: 'property', label: 'Property' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
  { type: 'divider', label: 'Divider' }
]

function add(type: string) {
  blocks.value = [...blocks.value, { type, text: type === 'text' ? '' : undefined }]
}
function remove(i: number) {
  blocks.value = blocks.value.filter((_, n) => n !== i)
}
function move(i: number, dir: -1 | 1) {
  const next = [...blocks.value]
  const j = i + dir
  if (j < 0 || j >= next.length) return
  ;[next[i], next[j]] = [next[j], next[i]]
  blocks.value = next
}

/** Debounced — typing shouldn't fire a render per keystroke. */
let timer: ReturnType<typeof setTimeout> | undefined
async function refresh() {
  clearTimeout(timer)
  timer = setTimeout(async () => {
    rendering.value = true
    try {
      const res = await $fetch<{ html: string }>('/api/campaigns/preview', {
        method: 'POST',
        body: { blocks: blocks.value, heading: props.heading, preheader: props.preheader }
      })
      html.value = res.html
    } catch {
      /* preview only — a failure here shouldn't block editing */
    } finally {
      rendering.value = false
    }
  }, 400)
}

watch(() => [blocks.value, props.heading, props.preheader], refresh, { deep: true, immediate: true })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="db-grid">
    <!-- Editor -->
    <div>
      <div v-for="(b, i) in blocks" :key="i" class="db-card" style="margin-bottom:var(--s2)">
        <div class="db-card-head">
          <p class="h-label">{{ TYPES.find(t => t.type === b.type)?.label || b.type }}</p>
          <div class="gf-row-actions">
            <button class="gf-meta gf-muted" :disabled="i === 0" @click="move(i, -1)">Up</button>
            <button class="gf-meta gf-muted" :disabled="i === blocks.length - 1" @click="move(i, 1)">Down</button>
            <button class="gf-meta" style="color:#B5563A" @click="remove(i)">Remove</button>
          </div>
        </div>

        <div v-if="b.type !== 'divider'" class="db-card-body">
          <template v-if="b.type === 'text'">
            <textarea
              v-model="b.text" rows="4" class="h-input" style="resize:vertical"
              :placeholder="`Hi ${TAG_NAME}, …`"
            />
            <p class="gf-label gf-muted" style="margin-top:6px">
              {{ TAG_NAME }} becomes their first name, {{ TAG_AGENT }} becomes yours.
            </p>
          </template>

          <template v-else-if="b.type === 'property'">
            <input v-model="b.address" class="h-input" placeholder="348 Whitefish Stage Road" style="margin-bottom:8px" />
            <div class="gf-field-row" style="border:0;padding:0;gap:8px">
              <input v-model="b.price" class="h-input" placeholder="$425,000" />
              <input v-model="b.beds" class="h-input" placeholder="3" />
              <input v-model="b.baths" class="h-input" placeholder="2" />
            </div>
            <input v-model="b.src" class="h-input" placeholder="Photo URL" style="margin-top:8px" />
          </template>

          <template v-else-if="b.type === 'image'">
            <input v-model="b.src" class="h-input" placeholder="Image URL" style="margin-bottom:8px" />
            <input v-model="b.alt" class="h-input" placeholder="Describe it — shown when images are blocked" />
            <p class="gf-label gf-muted" style="margin-top:6px">
              Most inboxes block images by default, so the description matters.
            </p>
          </template>

          <template v-else-if="b.type === 'button'">
            <input v-model="b.label" class="h-input" placeholder="See the full listing" style="margin-bottom:8px" />
            <input v-model="b.href" class="h-input" placeholder="https://…" />
          </template>
        </div>
      </div>

      <div class="gf-row-actions">
        <button v-for="t in TYPES" :key="t.type" class="h-btn h-btn-quiet gf-tap" @click="add(t.type)">
          + {{ t.label }}
        </button>
      </div>
    </div>

    <!-- Preview -->
    <div>
      <div class="db-card">
        <div class="db-card-head">
          <p class="h-label">What they'll see</p>
          <span class="db-count">{{ rendering ? 'Updating…' : 'Live' }}</span>
        </div>
        <iframe
          :srcdoc="html"
          title="Email preview"
          style="width:100%;height:620px;border:0;background:#EFEAE0"
        />
      </div>
      <div class="gf-row-actions" style="margin-top:12px">
        <button class="h-btn h-btn-quiet gf-tap" :disabled="sendingTest" @click="sendTest">
          {{ sendingTest ? 'Sending…' : 'Send a test to myself' }}
        </button>
      </div>
      <p class="gf-label gf-muted" style="margin-top:8px">
        Rendered by the same code that sends it — but check it in a real inbox
        before sending to your list.
      </p>
    </div>
  </div>
</template>
