<script setup lang="ts">
import { PRIORITIES, effectivePriority, isHighStakes, whenLabel, sortDeadlines, toDateInput } from '~/utils/priority'

/**
 * Documents and their extracted deadlines.
 *
 * The important part is the confirmation step. Every date arrives as a
 * PROPOSAL with the sentence it came from, because a misread contingency is a
 * missed deadline with real money attached — and the liability is the agent's,
 * not ours. Nothing becomes a reminder until they agree with it.
 */
const props = defineProps<{ homeId?: string; leadId?: string }>()

const toast = useToast()
const query = computed(() => ({ homeId: props.homeId, leadId: props.leadId }))
const { data: docs, refresh } = useFetch<any[]>('/api/documents', {
  key: `docs-${props.homeId || props.leadId || 'all'}`,
  query,
  // Client-only: the SSR pass has no session cookie, so this 401s on a hard
  // reload and the list renders empty. Same bug as the briefing deadlines.
  server: false,
  lazy: true
})

const list = computed(() => docs.value ?? [])
const editing = ref<string | null>(null)
const editDate = ref('')
const confirmingDelete = ref<string | null>(null)
const deleting = ref(false)

/**
 * Live deadlines lost with this document.
 *
 * Confirmed, undismissed, incomplete ones are IN the daily briefing. Deleting
 * the document removes them from tomorrow morning silently, so the confirm
 * says so rather than letting a realtor find out by the deadline passing.
 */
function liveDeadlineCount(doc: any) {
  return (doc.deadlines ?? []).filter(
    (d: any) => d.confirmed && !d.dismissed && !d.completed
  ).length
}

async function removeDoc(doc: any) {
  deleting.value = true
  try {
    await $fetch(`/api/documents/${doc._id}/delete`, { method: 'POST' })
    confirmingDelete.value = null
    await refresh()
    // The briefing reads confirmed deadlines, so it's now stale.
    await refreshNuxtData('briefing-deadlines')
    toast.add({ title: 'Document deleted.' })
  } catch (err: any) {
    toast.add({ title: err?.data?.message || 'Could not delete that document.', color: 'error', duration: 8000 })
  } finally {
    deleting.value = false
  }
}
let poll: ReturnType<typeof setInterval> | null = null

/** Poll while anything is still being read; always stops. */
function startPolling() {
  if (poll) clearInterval(poll)
  let ticks = 0
  poll = setInterval(async () => {
    ticks++
    await refresh()
    const working = list.value.some((d: any) => d.status === 'reading')
    // 24 ticks x 2.5s = 60s, just past the server's own 55s timeout. Polling
    // longer than the server can possibly take is only a longer spinner.
    if (!working || ticks > 24) { clearInterval(poll!); poll = null }
  }, 2500)
}

watch(list, (l) => {
  if (l.some((d: any) => d.status === 'reading') && !poll) startPolling()
}, { immediate: true })

onBeforeUnmount(() => { if (poll) clearInterval(poll) })

/** Unconfirmed proposals first — they're the thing needing attention. */
function deadlinesOf(doc: any) {
  const live = (doc.deadlines ?? []).filter((d: any) => !d.dismissed)
  return sortDeadlines(live)
}
function unconfirmedCount(doc: any) {
  return (doc.deadlines ?? []).filter((d: any) => !d.confirmed && !d.dismissed).length
}

function styleFor(d: any) {
  return PRIORITIES[effectivePriority(d.date, d.priority)]
}

async function act(docId: string, deadlineId: string, action: string, extra: Record<string, any> = {}) {
  try {
    await $fetch(`/api/documents/${docId}/deadline`, {
      method: 'POST',
      body: { deadlineId, action, ...extra }
    })
    await refresh()
  } catch {
    toast.add({ title: 'Could not update that.', color: 'error' })
  }
}

function beginEdit(d: any) {
  editing.value = d._id
  editDate.value = toDateInput(d.date)
}

async function saveEdit(docId: string, d: any) {
  await act(docId, d._id, 'confirm', { date: editDate.value })
  editing.value = null
}

defineExpose({ refresh })
</script>

<template>
  <div>
    <div v-if="!list.length" class="text-[13.5px] text-[#8A847C] py-6">
      No documents yet. Add a contract or inspection report and we'll pull out
      the dates you need to watch.
    </div>

    <div v-for="doc in list" :key="doc._id" class="border-t border-[#DDD6C9] py-6">
      <!-- Document header -->
      <div class="flex flex-wrap items-start justify-between gap-3 mb-1.5">
        <div class="min-w-0">
          <p class="text-[15px] font-semibold truncate">{{ doc.filename }}</p>
          <p class="text-[12.5px] text-[#8A847C]">
            <span v-if="doc.docType">{{ doc.docType }}</span>
            <span v-if="doc.docType && doc.deadlines?.length"> · </span>
            <span v-if="doc.deadlines?.length">{{ doc.deadlines.length }} dates found</span>
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <span
            v-if="unconfirmedCount(doc)"
            class="text-[10.5px] uppercase tracking-[0.1em] font-semibold px-2.5 py-1 border"
            style="color:#B5563A;border-color:#B5563A"
          >
            {{ unconfirmedCount(doc) }} to check
          </span>
          <appDocumentViewer
            :document-id="doc._id"
            :filename="doc.filename"
            :mime="doc.mime"
          />
          <button
            v-if="confirmingDelete !== doc._id"
            class="text-[12px] text-[#A9A39A] hover:text-[#4C5741] transition-colors"
            @click="confirmingDelete = doc._id"
          >
            Remove
          </button>
        </div>
      </div>

      <p v-if="doc.summary" class="text-[13px] text-[#8A847C] leading-relaxed mb-4 max-w-[62ch]">
        {{ doc.summary }}
      </p>

      <!-- Delete confirmation. Names what's lost — a document with live
           deadlines is a different decision from an unread one. -->
      <div v-if="confirmingDelete === doc._id" class="p-4 mb-4 border-l-2 border-[#B5563A] bg-[#B5563A]/5">
        <p class="text-[14px] font-semibold mb-1.5">Remove this document?</p>
        <p class="text-[13px] text-[#8A847C] leading-relaxed mb-4 max-w-[54ch]">
          The file is deleted from storage and can't be recovered — you'd need
          the original again.
          <template v-if="liveDeadlineCount(doc)">
            <strong class="text-[#1F1B16]">
              {{ liveDeadlineCount(doc) }} confirmed deadline{{ liveDeadlineCount(doc) === 1 ? '' : 's' }}
            </strong>
            will also disappear from your daily briefing.
          </template>
        </p>
        <div class="flex gap-2.5">
          <button
            class="px-4 py-2 bg-[#1F1B16] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] font-semibold hover:opacity-[0.86] disabled:opacity-40"
            :disabled="deleting"
            @click="removeDoc(doc)"
          >
            {{ deleting ? 'Removing…' : 'Remove' }}
          </button>
          <button
            class="px-4 py-2 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.1em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] disabled:opacity-40"
            :disabled="deleting"
            @click="confirmingDelete = null"
          >
            Keep it
          </button>
        </div>
      </div>

      <p v-if="doc.status === 'reading'" class="text-[13px] text-[#8A847C]">Reading the document…</p>
      <p v-else-if="doc.status === 'failed'" class="text-[13px] text-[#B5563A]">
        {{ doc.failureReason }}
      </p>

      <!-- Deadlines -->
      <div v-for="d in deadlinesOf(doc)" :key="d._id" class="mt-3">
        <div
          class="p-4 border-l-2"
          :style="{
            borderLeftColor: styleFor(d).color,
            background: d.completed ? 'transparent' : styleFor(d).bg,
            opacity: d.completed ? 0.5 : 1
          }"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <div class="flex items-center flex-wrap gap-2 mb-1">
                <!-- Word + shape + colour. Never colour alone. -->
                <span
                  class="inline-block w-2.5 h-2.5 shrink-0"
                  :style="{
                    background: styleFor(d).shape === 'filled' ? styleFor(d).color : 'transparent',
                    border: `1.5px solid ${styleFor(d).color}`
                  }"
                />
                <span class="text-[10.5px] uppercase tracking-[0.1em] font-semibold" :style="{ color: styleFor(d).color }">
                  {{ styleFor(d).label }}
                </span>
                <span class="text-[12.5px] text-[#8A847C]">{{ whenLabel(d.date) }}</span>
                <!-- Stakes, shown separately from urgency. A closing three
                     weeks out is consequential but not something to drop
                     today's work for. -->
                <span
                  v-if="isHighStakes(d.priority) && styleFor(d).value !== 'high'"
                  class="text-[10.5px] uppercase tracking-[0.1em] text-[#A9A39A] border border-[#DDD6C9] px-1.5 py-0.5"
                  title="Missing this costs money or the deal"
                >
                  High stakes
                </span>
              </div>
              <p class="text-[14.5px]" :class="d.completed ? 'line-through' : ''">{{ d.label }}</p>

              <!-- The source sentence. This is how they check our work. -->
              <p v-if="d.sourceText && !d.confirmed" class="text-[12px] text-[#8A847C] italic mt-2 leading-relaxed max-w-[58ch]">
                From the document: "{{ d.sourceText }}"
              </p>
            </div>
          </div>

          <!-- Unconfirmed: confirm, correct, or dismiss -->
          <div v-if="!d.confirmed && !d.completed" class="gf-row-actions mt-3.5">
            <template v-if="editing === d._id">
              <input v-model="editDate" type="date"
                class="bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-1.5 text-[13px]" />
              <button class="text-[12px] font-semibold text-[#4C5741]" @click="saveEdit(doc._id, d)">Save</button>
              <button class="text-[12px] text-[#8A847C]" @click="editing = null">Cancel</button>
            </template>
            <template v-else>
              <button
                class="text-[11px] uppercase tracking-[0.08em] font-semibold px-3 py-1.5 bg-[#1F1B16] text-[#F7F4EF]"
                @click="act(doc._id, d._id, 'confirm')"
              >
                That's right
              </button>
              <button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]" @click="beginEdit(d)">
                Wrong date
              </button>
              <button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]" @click="act(doc._id, d._id, 'dismiss')">
                Not a deadline
              </button>
            </template>
          </div>

          <!-- Confirmed: mark done -->
          <div v-else-if="!d.completed" class="mt-3">
            <button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]" @click="act(doc._id, d._id, 'complete')">
              Mark done
            </button>
          </div>
          <div v-else class="mt-3">
            <button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]" @click="act(doc._id, d._id, 'reopen')">
              Undo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
