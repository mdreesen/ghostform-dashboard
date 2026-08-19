<script setup lang="ts">
import { capitalizeFirstLetter } from '~/utils/formatters/useCapitalizeFirstLetter';

definePageMeta({
  layout: 'authenticated',
});

useHead({
  title: 'GhostForm | Leads',
  meta: [{ name: 'description', content: 'Every lead, grouped by where they stand.' }],
});

const { data: leads } = useNuxtData<any>('leads');

const total = computed(() => leads.value?.all?.length ?? 0);

// Status groups that actually contain leads — empty stages just add noise.
const groups = computed(() =>
  (leads.value?.status ?? []).filter((g: any) => (g?.leads?.length ?? 0) > 0)
);

// Leads never contacted, surfaced as a nudge at the top of the page.
const neverContacted = computed(() =>
  (leads.value?.all ?? []).filter((l: any) => !l.lastContactedAt).length
);
</script>

<template>
  <div class="max-w-[1240px] mx-auto">

    <!-- ── Page head ─────────────────────────────────────────── -->
    <header class="mb-20 pt-4">
      <p class="gf-eyebrow mb-5 gf-rise" style="--d:.05s">The archive</p>

      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="--d:.12s">
            Every lead, and where they stand.
          </h1>
          <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[46ch] gf-rise" style="--d:.2s">
            <template v-if="total">
              {{ total }} {{ total === 1 ? 'person' : 'people' }} in the pipeline<template
                v-if="neverContacted"
              >, {{ neverContacted }} never contacted</template>.
            </template>
            <template v-else>
              Nothing here yet. Leads arrive from your forms, or add one by hand.
            </template>
          </p>
        </div>

        <div class="gf-rise shrink-0" style="--d:.28s">
          <baseButtonNavigate text="+ Create Lead" path="/dashboard/leads/create" />
        </div>
      </div>
    </header>

    <!-- ── Grouped by status ─────────────────────────────────── -->
    <section
      v-for="(item, i) in groups"
      :key="item.label"
      class="gf-depth mb-24"
      :style="`--d:${0.04 * Number(i)}s`"
    >
      <div class="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <div class="flex items-baseline gap-4">
          <span class="gf-eyebrow">{{ String(Number(i) + 1).padStart(2, '0') }} — Stage</span>
          <span class="font-display text-[25px] font-semibold tracking-tight">
            {{ capitalizeFirstLetter(item.label) }}
          </span>
          <span class="text-[13px] text-[#A9A39A] tabular-nums">
            {{ item.leads.length }}
          </span>
        </div>
        <baseButtonExport :data="item.leads" />
      </div>

      <ClientOnly>
        <baseTable :data="item.leads" />
      </ClientOnly>
    </section>

    <!-- ── Everyone ──────────────────────────────────────────── -->
    <section class="gf-depth">
      <div class="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <div class="flex items-baseline gap-4">
          <span class="gf-eyebrow">Everyone</span>
          <span class="font-display text-[25px] font-semibold tracking-tight">All leads</span>
          <span class="text-[13px] text-[#A9A39A] tabular-nums">{{ total }}</span>
        </div>
        <baseButtonExport v-if="leads?.all?.length" :data="leads.all" />
      </div>

      <ClientOnly>
        <baseTable v-if="leads?.all?.length" :data="leads.all" />
      </ClientOnly>

      <div v-if="!leads?.all?.length" class="border-t border-b border-[#DDD6C9] py-16 text-center">
        <p class="text-[14px] text-[#8A847C] mb-6">
          No leads yet. They'll appear here as your forms capture them.
        </p>
        <baseButtonNavigate text="+ Create your first lead" path="/dashboard/leads/create" />
      </div>
    </section>

  </div>
</template>
