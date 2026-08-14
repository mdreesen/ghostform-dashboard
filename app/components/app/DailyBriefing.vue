<script setup lang="ts">
/**
 * Daily "Who to Contact" briefing card.
 * Reads from /api/briefing (cached under the 'briefing' key, prefetched in the
 * authenticated layout). Shows the ranked list of leads needing attention today,
 * bucketed into Overdue / New / Cold, with a one-tap action to open each lead.
 */
interface BriefingLead {
  _id: string
  name: string
  email: string
  phone: string
  status: string
  bucket: 'new' | 'overdue' | 'cold'
  reason: string
  daysSinceContact: number | null
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

// Cap the visible list so the dashboard stays scannable; the rest live on the
// leads page. Realtors act on the top of the list first anyway.
const VISIBLE_LIMIT = 8
const showAll = ref(false)
const visibleLeads = computed(() => {
  const all = briefing.value?.leads ?? []
  return showAll.value ? all : all.slice(0, VISIBLE_LIMIT)
})

const bucketMeta: Record<
  BriefingLead['bucket'],
  { label: string; dot: string; text: string }
> = {
  overdue: { label: 'Overdue', dot: 'bg-rose-400', text: 'text-rose-300' },
  new: { label: 'New', dot: 'bg-cyan-400', text: 'text-cyan-300' },
  cold: { label: 'Cold', dot: 'bg-amber-400', text: 'text-amber-300' }
}
</script>

<template>
  <div class="w-full">
    <!-- Headline / summary line -->
    <div
      class="backdrop-blur-xl bg-white/2 border border-white/8 p-6 rounded-3xl mb-6"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p
            class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2"
          >
            Today's Briefing
          </p>
          <p v-if="pending && !briefing" class="text-lg font-bold tracking-tight">
            Building your list…
          </p>
          <p v-else class="text-lg font-bold tracking-tight leading-snug">
            {{ briefing?.headline }}
          </p>
        </div>

        <!-- Count chips -->
        <div v-if="briefing?.totals?.total" class="flex gap-2 shrink-0">
          <div
            v-if="briefing.totals.overdue"
            class="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center"
          >
            <p class="text-xl font-bold tabular-nums text-rose-300">
              {{ briefing.totals.overdue }}
            </p>
            <p class="text-[9px] uppercase tracking-widest text-rose-400/70">
              Overdue
            </p>
          </div>
          <div
            v-if="briefing.totals.new"
            class="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center"
          >
            <p class="text-xl font-bold tabular-nums text-cyan-300">
              {{ briefing.totals.new }}
            </p>
            <p class="text-[9px] uppercase tracking-widest text-cyan-400/70">New</p>
          </div>
          <div
            v-if="briefing.totals.cold"
            class="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center"
          >
            <p class="text-xl font-bold tabular-nums text-amber-300">
              {{ briefing.totals.cold }}
            </p>
            <p class="text-[9px] uppercase tracking-widest text-amber-400/70">
              Cold
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- The ranked action list -->
    <div
      v-if="briefing?.leads?.length"
      class="flex flex-col gap-2"
    >
      <NuxtLink
        v-for="lead in visibleLeads"
        :key="lead._id"
        :to="`/dashboard/leads/${lead._id}/details`"
        class="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-600 transition-colors"
      >
        <div class="flex items-center gap-3 min-w-0">
          <span
            class="w-2 h-2 rounded-full shrink-0"
            :class="bucketMeta[lead.bucket].dot"
          />
          <div class="min-w-0">
            <p class="font-bold truncate group-hover:text-cyan-400 transition-colors">
              {{ lead.name }}
            </p>
            <p class="text-xs text-zinc-500 truncate">{{ lead.reason }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <span
            class="text-[10px] font-bold uppercase tracking-widest"
            :class="bucketMeta[lead.bucket].text"
          >
            {{ bucketMeta[lead.bucket].label }}
          </span>
          <span class="text-zinc-600 group-hover:text-zinc-300 transition-colors">
            &rarr;
          </span>
        </div>
      </NuxtLink>

      <button
        v-if="briefing.leads.length > VISIBLE_LIMIT"
        class="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors self-center py-2"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Show less' : `Show all ${briefing.leads.length}` }}
      </button>
    </div>

    <!-- Empty / caught-up state -->
    <div
      v-else-if="!pending"
      class="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center"
    >
      <p class="text-sm text-zinc-400">
        Nothing needs a follow-up right now. New and cold leads will appear here
        automatically.
      </p>
    </div>
  </div>
</template>
