<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
});

useHead({
  title: 'GhostForm | Today',
  meta: [
    { name: 'description', content: 'GhostForm Main Dashboard.' },
  ],
});

const { data: user } = useNuxtData<any>('user');
const { data: leads } = useNuxtData<any>('leads');
const { data: charts_lead } = useNuxtData<any>('charts_lead');
const { data: briefing } = useNuxtData<any>('briefing');

const chart_data = computed(() => charts_lead?.value?.monthly);

// Warm, human greeting line for the hero.
const firstName = computed(() => (user.value?.name || '').split(' ')[0] || '');
const today = computed(() =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long'
  })
);

// The hero headline states the day's actual workload.
const heroLine = computed(() => {
  const t = briefing.value?.totals;
  if (!t || t.total === 0) return 'You’re all caught up today.';
  const n = t.total;
  return n === 1
    ? 'One person is waiting to hear from you.'
    : `${n} people are waiting to hear from you.`;
});

// Pipeline counts by status for the section 02 strip.
const pipeline = computed(() => {
  const all = leads.value?.all ?? [];
  const count = (s: string) => all.filter((l: any) => l.status === s).length;
  const stages = [
    { label: 'New', value: count('new') },
    { label: 'Appointment', value: count('appointment') },
    { label: 'Under contract', value: count('under contract') },
    { label: 'Closed', value: count('closed') },
  ];
  const max = Math.max(1, ...stages.map((s) => s.value));
  return stages.map((s) => ({ ...s, ratio: s.value / max }));
});

const activeLeads = computed(() =>
  (leads.value?.all ?? []).filter((l: any) => !['closed', 'archive'].includes(l.status)).length
);
</script>

<template>
  <div class="max-w-[1240px] mx-auto">

    <!-- ── Hero with the 3D terrain ─────────────────────────── -->
    <section class="gf-hero relative gf-bleed mb-24">
      <ClientOnly>
        <baseTerrain />
      </ClientOnly>

      <div class="relative z-[2] py-16 sm:py-24">
        <p class="h-label mb-5 gf-rise" style="--d:.05s">
          {{ today }}<template v-if="firstName"> — Hello, {{ firstName }}</template>
        </p>
        <h1
          class="gf-display text-[clamp(36px,5.2vw,68px)] max-w-[15ch] mb-5 gf-rise"
          style="--d:.14s"
        >
          {{ heroLine }}
        </h1>
        <p class="gf-body text-[#8A847C] leading-relaxed max-w-[42ch] gf-rise" style="--d:.24s">
          Everyone below has gone quiet, come in new, or slipped past a follow-up
          you meant to make. Start at the top.
        </p>
      </div>
    </section>

    <!-- ── 01 Who to reach ──────────────────────────────────── -->
    <section class="gf-depth mb-28" style="--d:.05s" data-tour="briefing">
      <!-- Capture a note from the morning screen, where they already are. -->
      <div class="mb-8"><appVoiceCapture /></div>

      <ClientOnly>
        <appDailyBriefing />
      </ClientOnly>
    </section>

    <!-- ── Stats ────────────────────────────────────────────── -->
    <section class="gf-depth mb-28 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9]">
      <div class="bg-[#F7F4EF] p-8 transition-transform duration-500 hover:translate-z-6">
        <p class="h-label mb-4">Active leads</p>
        <p class="font-display text-[44px] font-semibold leading-none tabular-nums">
          <span :data-count="activeLeads">0</span>
        </p>
        <p class="gf-meta text-[#8A847C] mt-2.5">Not closed or archived</p>
      </div>
      <div class="bg-[#F7F4EF] p-8">
        <p class="h-label mb-4">Needing attention</p>
        <p class="font-display text-[44px] font-semibold leading-none tabular-nums">
          <span :data-count="briefing?.totals?.total ?? 0">0</span>
        </p>
        <p class="gf-meta text-[#8A847C] mt-2.5">Surfaced in today’s briefing</p>
      </div>
      <div class="bg-[#F7F4EF] p-8">
        <p class="h-label mb-4">Going cold</p>
        <p class="font-display text-[44px] font-semibold leading-none tabular-nums">
          <span :data-count="briefing?.totals?.cold ?? 0">0</span>
        </p>
        <p class="gf-meta text-[#8A847C] mt-2.5">Quiet past your threshold</p>
      </div>
    </section>

    <!-- ── 02 Pipeline ──────────────────────────────────────── -->
    <section class="gf-depth mb-28">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="h-label">02 — Pipeline</span>
        <span class="font-display gf-title font-semibold tracking-tight">Where everyone stands</span>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDD6C9] border border-[#DDD6C9]">
        <div
          v-for="(stage, i) in pipeline"
          :key="stage.label"
          class="bg-[#F7F4EF] p-7"
        >
          <p class="font-display text-[34px] font-semibold tabular-nums mb-2">
            <span :data-count="stage.value">0</span>
          </p>
          <p class="gf-label uppercase tracking-[0.14em] text-[#8A847C]">{{ stage.label }}</p>
          <div class="h-0.5 bg-[#DDD6C9] mt-4 overflow-hidden">
            <i
              class="gf-bar block h-full bg-[#4C5741] origin-left"
              :style="{ '--w': stage.ratio, '--bd': `${0.1 * i}s` }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ── 03 Charts ────────────────────────────────────────── -->
    <section class="gf-depth mb-28">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="h-label">03 — Trend</span>
        <span class="font-display gf-title font-semibold tracking-tight">Leads over time</span>
      </div>
      <ClientOnly>
        <div v-if="chart_data" class="flex flex-wrap items-center justify-evenly gap-12">
          <baseChartsLine :data="chart_data" />
          <baseChartsDonut :data="chart_data" />
        </div>
        <p v-else class="gf-body text-[#8A847C] py-10">Loading chart data…</p>
        <template #fallback>
          <p class="gf-body text-[#8A847C] py-10">Loading chart data…</p>
        </template>
      </ClientOnly>
    </section>

    <!-- ── 04 All leads ─────────────────────────────────────── -->
    <section class="gf-depth">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="h-label">04 — Everyone</span>
        <span class="font-display gf-title font-semibold tracking-tight">All leads</span>
      </div>
      <ClientOnly>
        <baseTable v-if="leads" :data="leads?.all" />
      </ClientOnly>
    </section>

  </div>
</template>

<style scoped>
.gf-hero { min-height: 62vh; }

/* pipeline bars sweep out when the section reveals */
.gf-bar {
  transform: scaleX(0);
  transition: transform 1.1s cubic-bezier(.16, 1, .3, 1);
  transition-delay: var(--bd, 0s);
}
.gf-depth.in .gf-bar { transform: scaleX(var(--w, .5)); }

@media (prefers-reduced-motion: reduce) {
  .gf-bar { transform: scaleX(var(--w, .5)); }
}
</style>
