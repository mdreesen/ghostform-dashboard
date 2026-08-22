<script setup lang="ts">

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

const { data: briefing } = useNuxtData<Briefing>('briefing')
const pending = computed(() => !briefing.value)
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
  fileAway(lead._id)

  try {
    await $fetch(`/api/leads/${lead._id}/contacted`, { method: 'POST' })
    toast.success(`Marked ${lead.name} as contacted`)
    await refreshNuxtData('leads')
  } catch {
    // Roll back on failure.
    if (briefing.value) {
      briefing.value.leads = prevLeads
      briefing.value.totals = prevTotals
    }
    toast.error('Could not update. Please try again.')
  } finally {
    marking.value.delete(lead._id);
    await refreshNuxtData('leads')
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Section header -->
    <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
      <span class="gf-eyebrow">01 — Today</span>
      <span class="font-display text-[25px] font-semibold tracking-tight">Who to reach</span>
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
      class="font-display text-[26px] sm:text-[30px] leading-[1.32] max-w-[26ch] mb-11"
    >
      {{ briefing?.headline }}
    </p>

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
          class="absolute left-0 top-0 bottom-0 w-0.5 bg-[#B5563A] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"
        />

        <span class="gf-ref hidden sm:block text-[11px] tracking-[0.1em] text-[#A9A39A] tabular-nums">
          № {{ lead._id.slice(-4).toUpperCase() }}
        </span>

        <span class="gf-marker flex items-center gap-2.5">
          <span class="w-[7px] h-[7px] shrink-0 transition-transform" :class="bucketMeta[lead.bucket].sq" />
          <span class="text-[10.5px] uppercase tracking-[0.14em] text-[#8A847C]">
            {{ bucketMeta[lead.bucket].label }}
          </span>
        </span>

        <NuxtLink :to="`/dashboard/leads/${lead._id}/details`" class="gf-main min-w-0">
          <p class="font-display text-[19px] font-semibold tracking-tight mb-0.5 truncate group-hover:text-[#B5563A] transition-colors">
            {{ lead.name }}
          </p>
          <p class="text-[13.5px] text-[#8A847C] truncate">
            {{ lead.reason }} · {{ lead.lastContactLabel }}
          </p>
        </NuxtLink>

        <div
          class="gf-actions flex gap-2.5 opacity-60 group-hover:opacity-100 transition-opacity"
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
            class="text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border border-[#B5563A] text-[#B5563A] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            @click="markContacted(lead)"
          >
            {{ marking.has(lead._id) ? 'Saving…' : 'Contacted' }}
          </button>
        </div>
      </div>

      <button
        v-if="briefing.leads.length > VISIBLE_LIMIT"
        class="mt-8 gf-eyebrow hover:text-[#B5563A] transition-colors"
        @click="showAll = !showAll"
      >
        {{ showAll ? '— Show less' : `— Show all ${briefing.leads.length}` }}
      </button>
    </div>

    <!-- Caught up -->
    <div v-else-if="!pending" class="border-t border-b border-[#DDD6C9] py-14 text-center">
      <p class="text-[14px] text-[#8A847C]">
        Nothing needs a follow-up right now. New and cold leads appear here automatically.
      </p>
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
