<script setup lang="ts">
/**
 * Document upload — used on a home or a lead page.
 *
 * The file goes straight to storage via a presigned URL, then we record it and
 * kick off the date extraction. A 20MB contract never passes through the
 * server.
 */
const props = defineProps<{
  homeId?: string
  leadId?: string
}>()

const emit = defineEmits<{ uploaded: [] }>()

const toast = useToast()
const input = ref<HTMLInputElement | null>(null)
const busy = ref(false)
const stage = ref('')
const error = ref('')
const dragging = ref(false)

// Which storage driver is live. Local disk is fine while testing but is
// per-instance and ephemeral once deployed, so it shouldn't be silent.
const { data: storage } = useFetch<any>('/api/storage-mode', {
  key: 'storage-mode', server: false, lazy: true, default: () => ({ driver: 'r2' })
})

// Dragging over a child fires dragleave on the parent, so a plain boolean
// flickers. Counting enter/leave pairs is the reliable way.
let dragDepth = 0

const ACCEPT = '.pdf,image/jpeg,image/png,image/webp,image/heic'
const ACCEPTED_TYPES = [
  'application/pdf',
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'
]

/**
 * Validate BEFORE uploading. A 20MB contract that fails after two minutes on a
 * slow connection is a far worse experience than one refused instantly.
 */
function validate(file: File): string | null {
  const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
  const ok = isPdf || ACCEPTED_TYPES.includes(file.type)

  if (!ok) {
    if (/\.(docx?|pages)$/i.test(file.name)) {
      return 'Word documents need exporting to PDF first.'
    }
    return 'Upload a PDF or a photo of the document.'
  }
  if (file.size > 25 * 1024 * 1024) {
    return 'That file is over 25MB. Try exporting it at a lower quality.'
  }
  return null
}

function onPick(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) handle(file)
  if (input.value) input.value.value = ''
}

function onDrop(e: DragEvent) {
  dragDepth = 0
  dragging.value = false
  if (busy.value) return

  const files = Array.from(e.dataTransfer?.files ?? [])
  if (!files.length) return
  if (files.length > 1) {
    error.value = 'One document at a time — each one gets read separately.'
    return
  }
  handle(files[0]!)
}

function onDragEnter() { if (!busy.value) { dragDepth++; dragging.value = true } }
function onDragLeave() { dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) dragging.value = false }

/** Paste a screenshot — common when someone photographs a page on their phone. */
function onPaste(e: ClipboardEvent) {
  if (busy.value) return
  const f = Array.from(e.clipboardData?.items ?? [])
    .filter((i) => i.kind === 'file')
    .map((i) => i.getAsFile())
    .find(Boolean)
  if (f) handle(f)
}

onMounted(() => window.addEventListener('paste', onPaste))
onBeforeUnmount(() => window.removeEventListener('paste', onPaste))

async function handle(file: File) {
  error.value = ''

  const problem = validate(file)
  if (problem) { error.value = problem; return }

  busy.value = true

  try {
    stage.value = 'Uploading'
    const { uploadUrl, key } = await $fetch<{ uploadUrl: string; key: string }>('/api/uploads/sign', {
      method: 'POST',
      body: {
        filename: file.name,
        contentType: file.type || 'application/pdf',
        bytes: file.size,
        scope: 'document'
      }
    })

    const put = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type || 'application/pdf' }
    })
    if (!put.ok) throw new Error(`Upload failed (${put.status})`)

    stage.value = 'Saving'
    const { _id } = await $fetch<{ _id: string }>('/api/documents/create', {
      method: 'POST',
      body: {
        filename: file.name,
        storageKey: key,
        mime: file.type || 'application/pdf',
        bytes: file.size,
        homeId: props.homeId ?? null,
        leadId: props.leadId ?? null
      }
    })

    // Reading is fire-and-forget on the server; the list polls for the result.
    stage.value = 'Reading dates'
    await $fetch(`/api/documents/${_id}/read`, { method: 'POST' }).catch(() => {
      // A failed read isn't a failed upload — the file is safely stored and
      // the realtor can add dates by hand.
      toast.add({ title: 'Uploaded, but we could not read it. You can add dates yourself.' })
    })

    // Refresh the list by its fetch key rather than through a template ref.
    // DocumentList has a top-level await, which makes it an ASYNC component —
    // a parent's ref points at the Suspense wrapper before defineExpose has
    // run, so `docList.refresh` genuinely isn't a function yet.
    const listKey = `docs-${props.homeId || props.leadId || 'all'}`
    await refreshNuxtData(listKey)

    emit('uploaded')
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Could not upload that file.'
  } finally {
    busy.value = false
    stage.value = ''
  }
}
</script>

<template>
  <div>
    <input ref="input" type="file" :accept="ACCEPT" class="hidden" @change="onPick" />

    <div
      class="w-full border border-dashed py-7 sm:py-9 px-4 sm:px-5 text-center cursor-pointer transition-colors"
      :class="[
        dragging ? 'border-[#4C5741] bg-[#4C5741]/6' : 'border-[#DDD6C9] hover:border-[#A9A39A]',
        busy ? 'cursor-default opacity-70' : ''
      ]"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="!busy && input?.click()"
    >
      <!-- Uploading -->
      <template v-if="busy">
        <p class="text-[14.5px] font-semibold mb-1">{{ stage }}…</p>
        <p class="text-[12.5px] text-[#8A847C]">Keep this page open</p>
      </template>

      <!-- Dragging over -->
      <template v-else-if="dragging">
        <p class="text-[15px] font-semibold text-[#B5563A] mb-1">Drop it here</p>
        <p class="text-[12.5px] text-[#8A847C]">We'll read the dates out of it</p>
      </template>

      <!-- Idle -->
      <template v-else>
        <svg
          class="mx-auto mb-3.5" width="26" height="26" viewBox="0 0 24 24"
          fill="none" stroke="#A9A39A" stroke-width="1.4"
          stroke-linecap="round" stroke-linejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
        <p class="text-[14.5px] font-semibold mb-1">
          Drag a document here, or click to browse
        </p>
        <p class="text-[12.5px] text-[#8A847C]">
          PDF or a photo — contracts, inspections, disclosures. You can paste too.
        </p>
      </template>
    </div>

    <p v-if="error" class="text-[12.5px] text-[#B5563A] mt-2.5">{{ error }}</p>

    <p v-if="storage?.driver === 'local'" class="text-[11.5px] text-[#A9A39A] mt-2.5 leading-relaxed">
      Saving to this machine while you test. Add your R2 keys to
      <code>.env</code> before going live — local files don't survive a deploy.
    </p>
  </div>
</template>
