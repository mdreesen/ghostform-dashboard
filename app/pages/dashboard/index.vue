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

    <!-- ══════════════════════════════════════════════════════════════
         The morning screen.

         Was: a full-height 3D hero, then the briefing, then stats buried
         below the fold. A realtor scrolled past decoration to reach the
         numbers and past the numbers to reach the work.

         Now: what's on fire in the first two seconds, then the work.
         The terrain stays as a quiet band behind the greeting rather than
         a full screen of it — it's the brand, not the content.
         ══════════════════════════════════════════════════════════════ -->

    <section class="gf-hero relative gf-bleed" style="margin-bottom:var(--s4)">
      <ClientOnly>
        <baseTerrain />
      </ClientOnly>

      <div class="relative z-[2]" style="padding-block:var(--s4)">
        <p class="h-label gf-rise" style="--d:.05s;margin-bottom:8px">
          {{ today }}<template v-if="firstName"> — Hello, {{ firstName }}</template>
        </p>
        <h1 class="gf-display gf-rise" style="--d:.14s;font-size:clamp(30px,4.4vw,46px);max-width:18ch;margin-bottom:8px">
          {{ heroLine }}
        </h1>
        <p class="gf-meta gf-rise" style="--d:.24s;max-width:52ch">
          Everyone below has gone quiet, come in new, or slipped past a
          follow-up you meant to make. Start at the top.
        </p>
      </div>
    </section>

    <!-- Metrics. Four, deliberately — an odd count leaves a dead cell when
         the grid wraps to two columns on a phone. -->
    <div class="db-stats" style="margin-bottom:var(--s4)">
      <NuxtLink to="/dashboard/leads" class="db-stat" :data-zero="(briefing?.totals?.overdue ?? 0) === 0">
        <span class="db-stat-n" :style="{ color: (briefing?.totals?.overdue ?? 0) > 0 ? '#B5563A' : undefined }">
          {{ briefing?.totals?.overdue ?? 0 }}
        </span>
        <span class="db-stat-l">Overdue</span>
      </NuxtLink>

      <NuxtLink to="/dashboard/leads" class="db-stat" :data-zero="(briefing?.totals?.new ?? 0) === 0">
        <span class="db-stat-n">{{ briefing?.totals?.new ?? 0 }}</span>
        <span class="db-stat-l">New leads</span>
      </NuxtLink>

      <NuxtLink to="/dashboard/leads" class="db-stat" :data-zero="(briefing?.totals?.cold ?? 0) === 0">
        <span class="db-stat-n">{{ briefing?.totals?.cold ?? 0 }}</span>
        <span class="db-stat-l">Going cold</span>
      </NuxtLink>

      <NuxtLink to="/dashboard/leads" class="db-stat" :data-zero="activeLeads === 0">
        <span class="db-stat-n">{{ activeLeads }}</span>
        <span class="db-stat-l">Active leads</span>
      </NuxtLink>
    </div>

    <!-- The work. Briefing takes the wide column; it's what they opened
         this screen for. -->
    <div data-tour="briefing">
      <ClientOnly>
        <appDailyBriefing />
      </ClientOnly>
    </div>

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
.gf-hero { min-height: 25vh; }

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
