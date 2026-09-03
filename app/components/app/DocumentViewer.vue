<script setup lang="ts">
/**
 * Document viewer.
 *
 * Desktop gets an inline overlay; mobile opens a new tab. Embedded PDFs in an
 * iframe are unreliable on iOS — Safari often shows a blank frame or only the
 * first page — and a realtor checking a contingency on their phone can't
 * afford that. A new tab uses the OS viewer, which always works.
 */
const props = defineProps<{ documentId: string; filename: string; mime?: string }>()

const open = ref(false)
const loading = ref(false)
const url = ref('')
const error = ref('')

const isPdf = computed(() => (props.mime || '').includes('pdf') || /\.pdf$/i.test(props.filename))

/** Coarse pointer = phone or tablet. */
const preferNewTab = computed(() =>
  import.meta.client && window.matchMedia('(pointer: coarse), (max-width: 720px)').matches
)

async function view() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ url: string }>(`/api/documents/${props.documentId}/view`)
    url.value = res.url

    if (preferNewTab.value) {
      // Opened synchronously enough to survive most popup blockers; if it's
      // blocked, the link below is the fallback.
      const w = window.open(res.url, '_blank', 'noopener')
      if (!w) error.value = 'Your browser blocked the new tab — use the link below.'
      return
    }
    open.value = true
  } catch (err: any) {
    error.value = err?.data?.message || 'Could not open that document.'
  } finally {
    loading.value = false
  }
}

function close() { open.value = false; url.value = '' }

// The signed URL expires in 5 minutes; close rather than show a broken frame.
let expiry: ReturnType<typeof setTimeout> | undefined
watch(open, (v) => {
  clearTimeout(expiry)
  if (v) expiry = setTimeout(() => { open.value = false }, 4.5 * 60 * 1000)
})
onBeforeUnmount(() => clearTimeout(expiry))
</script>

<template>
  <span>
    <button
      class="gf-meta"
      style="color:#4C5741;text-decoration:underline;text-underline-offset:3px"
      :disabled="loading"
      @click="view"
    >
      {{ loading ? 'Opening…' : 'View' }}
    </button>

    <p v-if="error" class="gf-label" style="color:#B5563A;margin-top:4px">
      {{ error }}
      <a v-if="url" :href="url" target="_blank" rel="noopener" style="color:#4C5741">Open it here</a>
    </p>

    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex flex-col"
        style="background:rgba(31,27,22,.55)"
        @click.self="close"
      >
        <div class="flex items-center justify-between gap-4 px-4 py-3" style="background:#F7F4EF;border-bottom:1px solid #DDD6C9">
          <p class="gf-body" style="font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
            {{ filename }}
          </p>
          <div class="flex items-center gap-4 shrink-0">
            <a :href="url" target="_blank" rel="noopener" class="gf-meta" style="color:#4C5741">Open in new tab</a>
            <button class="gf-meta" @click="close">Close</button>
          </div>
        </div>

        <iframe
          v-if="isPdf"
          :src="url"
          title="Document"
          style="flex:1;width:100%;border:0;background:#F7F4EF"
        />
        <div v-else style="flex:1;overflow:auto;background:#F7F4EF;display:grid;place-items:center;padding:16px">
          <img :src="url" :alt="filename" style="max-width:100%;height:auto" />
        </div>
      </div>
    </Teleport>
  </span>
</template>
