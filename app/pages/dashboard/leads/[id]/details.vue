<script setup lang="ts">
import type { Lead } from '~/types/lead';

definePageMeta({
  layout: 'authenticated',
});

const route = useRoute();
const toast = useToast();

const { data, pending: pending_data } = await useFetch<Lead>(`/api/leads/${route.params.id}`);
const lead = ref(data.value);

useHead({ title: () => `GhostForm | ${lead.value?.name || 'Lead'}` });

const marking = ref(false);

/** How long since we last reached this person. */
const lastContact = computed(() => {
  const raw = (lead.value as any)?.lastContactedAt;
  if (!raw) return 'Never contacted';
  const days = Math.floor((Date.now() - new Date(raw).getTime()) / 86400000);
  if (days <= 0) return 'Contacted today';
  if (days === 1) return 'Contacted 1 day ago';
  return `Contacted ${days} days ago`;
});

const money = (n?: number) => (n && n > 0 ? `$${n.toLocaleString('en-US')}` : null);

// Only show facts the lead actually gave us — blank rows read as neglect.
const facts = computed(() => {
  const l: any = lead.value || {};
  return [
    { label: 'Est. value', value: money(l.price) },
    { label: 'Budget', value: money(l.budget) },
    { label: 'Square footage', value: l.sqft ? `${l.sqft} ft²` : null },
    { label: 'Bedrooms', value: l.bedrooms || null },
    { label: 'Bathrooms', value: l.bathrooms || null },
    { label: 'Intent', value: l.buy_sell_both || null },
    { label: 'Timeline', value: l.want_to_move || null },
    { label: 'Working with an agent', value: l.seeing_an_agent || null },
    { label: 'Source', value: l.source || null },
  ].filter((f) => f.value);
});

async function markContacted() {
  if (marking.value) return;
  marking.value = true;
  try {
    await $fetch(`/api/leads/${route.params.id}/contacted`, { method: 'POST' });
    (lead.value as any).lastContactedAt = new Date().toISOString();
    toast.success('Marked as contacted');
    await Promise.all([refreshNuxtData('leads'), refreshNuxtData('briefing')]);
  } catch {
    toast.error('Could not update. Please try again.');
  } finally {
    marking.value = false;
  }
}
</script>

<template>
  <div v-if="!pending_data" class="max-w-[1100px] mx-auto">

    <!-- ── Head ──────────────────────────────────────────────── -->
    <header class="mb-16 pt-4">
      <NuxtLink
        to="/dashboard/leads"
        class="gf-eyebrow inline-block mb-6 hover:text-[#B5563A] transition-colors gf-rise"
        style="--d:.04s"
      >
        ← All leads
      </NuxtLink>

      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div class="gf-rise" style="--d:.1s">
          <h1 class="gf-display text-[clamp(34px,4.4vw,54px)] mb-3">
            {{ lead?.name || 'Unnamed lead' }}
          </h1>
          <div class="flex flex-wrap items-center gap-3 text-[13px] text-[#8A847C]">
            <span class="inline-flex items-center gap-2">
              <span class="w-[7px] h-[7px] bg-[#B5563A]" />
              <span class="uppercase tracking-[0.14em] text-[10.5px]">{{ lead?.status }}</span>
            </span>
            <span class="text-[#DDD6C9]">·</span>
            <span>{{ lastContact }}</span>
          </div>
        </div>

        <div class="flex gap-2.5 gf-rise shrink-0" style="--d:.18s">
          <ClientOnly>
            <appLeadMessageComposer
              v-if="lead?._id"
              :lead-id="String(lead._id)"
              :lead-name="lead?.name"
              :lead-phone="lead?.phone"
            />
          </ClientOnly>
          <button
            :disabled="marking"
            class="text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border border-[#B5563A] text-[#B5563A] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors disabled:opacity-40"
            @click="markContacted"
          >
            {{ marking ? 'Saving…' : 'Contacted' }}
          </button>
          <baseButtonNavigate text="Edit" :path="`/dashboard/leads/${route.params.id}/edit`" />
        </div>
      </div>
    </header>

    <!-- ── 01 Reach them ─────────────────────────────────────── -->
    <section class="gf-depth mb-20">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">01 — Contact</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">How to reach them</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9]">
        <div class="bg-[#F7F4EF] p-7">
          <p class="gf-eyebrow mb-3">Email</p>
          <baseMessage :label="lead?.email" message_type="mailto" communication_type="email" />
        </div>
        <div class="bg-[#F7F4EF] p-7">
          <p class="gf-eyebrow mb-3">Phone</p>
          <baseMessage :label="lead?.phone" message_type="sms" communication_type="phone" />
        </div>
        <div class="bg-[#F7F4EF] p-7">
          <p class="gf-eyebrow mb-3">Prefers</p>
          <p class="text-[15px]">{{ lead?.best_communication_method || 'Not specified' }}</p>
        </div>
      </div>
    </section>

    <!-- ── 02 What they told us ──────────────────────────────── -->
    <section class="gf-depth mb-20">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">02 — Submission</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">What they told you</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7">
          <div v-if="facts.length">
            <div
              v-for="f in facts"
              :key="f.label"
              class="flex justify-between items-baseline gap-6 border-b border-[#DDD6C9] py-3.5"
            >
              <span class="gf-eyebrow">{{ f.label }}</span>
              <span class="font-display text-[17px] font-semibold text-right">{{ f.value }}</span>
            </div>
          </div>
          <p v-else class="text-[14px] text-[#8A847C] py-6">
            They didn't fill in any details beyond their contact info.
          </p>

          <div v-if="lead?.address" class="mt-8">
            <p class="gf-eyebrow mb-3">Address</p>
            <baseMaps :address="lead?.address" />
          </div>
        </div>

        <div class="lg:col-span-5">
          <p class="gf-eyebrow mb-3">Notes</p>
          <div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7">
            <p class="text-[14.5px] leading-relaxed">
              {{ lead?.notes || 'No notes yet.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 03 AI read ────────────────────────────────────────── -->
    <ClientOnly>
      <section v-if="lead?.ai_analysis" class="gf-depth">
        <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
          <span class="gf-eyebrow">03 — Analysis</span>
          <span class="font-display text-[25px] font-semibold tracking-tight">The read on this lead</span>
        </div>
        <div class="bg-[#EFEAE0] border border-[#DDD6C9] p-9 relative">
          <span class="absolute top-5 right-5 gf-eyebrow text-[#A9A39A]">AI generated</span>
          <p class="text-[15px] leading-[1.75] max-w-[70ch]" v-html="lead?.ai_analysis" />
        </div>
      </section>
    </ClientOnly>

  </div>
</template>
