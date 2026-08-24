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
const sendingQuestionnaire = ref(false);
const analysing = ref(false);

/** Has this lead already been sent, or completed, the deep-dive questionnaire? */
const qual = computed(() => (lead.value as any)?.qualification || {});
const analysis = computed(() => lead.value?.ai_analysis || null);
const answeredCount = computed(() =>
  Object.values(qual.value?.answers || {}).filter((v: any) => String(v ?? '').trim()).length
);
const qualificationAnswer = (key: string) => (lead.value as any)?.qualification?.answers?.[key];

/** Default to what the lead already told us at capture. */
const intent = ref(
  String((lead.value as any)?.buy_sell_both || '').toLowerCase().includes('sell') ? 'sell' : 'buy'
);

async function sendQuestionnaire() {
  if (sendingQuestionnaire.value) return;
  sendingQuestionnaire.value = true;
  try {
    await $fetch(`/api/leads/${route.params.id}/send-questionnaire`, {
      method: 'POST',
      body: { intent: intent.value }
    });
    toast.success('Questionnaire sent.');
    // Reflect sentAt locally so the button state updates without a reload.
    (lead.value as any).qualification = {
      ...(lead.value as any).qualification,
      sentAt: new Date().toISOString(),
      intent: intent.value
    };
  } catch (err: any) {
    toast.error(err?.data?.message || 'Could not send the questionnaire.');
  } finally {
    sendingQuestionnaire.value = false;
  }
}

async function runAnalysis() {
  if (analysing.value) return;
  analysing.value = true;
  try {
    const res = await $fetch<any>(`/api/leads/${route.params.id}/analyse`, { method: 'POST' });
    (lead.value as any).analysis = {
      ...res.scorecard,
      read: res.read,
      nextSteps: res.nextSteps,
      source: res.source,
      generatedAt: res.generatedAt
    };
    await refreshNuxtData(['leads']);

    toast.success('Analysis updated.');
  } catch (err: any) {
    toast.error(err?.data?.message || 'Could not run the analysis.');
  } finally {
    analysing.value = false;
  }
}

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
    { label: 'Aquired at', value: l.seen_at || null }
  ].filter((f) => f.value);
});

async function markContacted() {
  if (marking.value) return;
  marking.value = true;
  try {
    await $fetch(`/api/leads/${route.params.id}/contacted`, { method: 'POST' });
  } catch {
    // Only a failed WRITE is an error worth showing.
    toast.error('Could not update. Please try again.');
    marking.value = false;
    return;
  }

  (lead.value as any).lastContactedAt = new Date().toISOString();
  toast.success('Marked as contacted');

  // Refresh is best-effort — the contact is already saved, so a failed
  // refetch must not surface as "could not update".
  try {
    await Promise.all([refreshNuxtData('leads'), refreshNuxtData('briefing')]);
  } catch (err) {
    console.error('[lead] refresh after contact failed (contact was saved):', err);
  } finally {
    marking.value = false;
  }
}
</script>

<template>
  <div v-if="!pending_data" class="max-w-[1100px] mx-auto">

    <!-- ── Head ──────────────────────────────────────────────── -->
    <header class="mb-16 pt-4">
      <NuxtLink to="/dashboard/leads"
        class="gf-eyebrow inline-block mb-6 hover:text-[#B5563A] transition-colors gf-rise" style="--d:.04s">
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
            <appLeadMessageComposer v-if="lead?._id" :lead-id="String(lead._id)" :lead-name="lead?.name"
              :lead-phone="lead?.phone" />
          </ClientOnly>
          <button :disabled="marking"
            class="text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border border-[#B5563A] text-[#B5563A] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors disabled:opacity-40"
            @click="markContacted">
            {{ marking ? 'Saving…' : 'Contacted' }}
          </button>
          <baseButtonNavigate text="Edit" :path="`/dashboard/leads/${route.params.id}/edit`" />
        </div>
      </div>
    </header>

    <!-- ── 01 Reach them ─────────────────────────────────────── -->
    <!-- ── Qualification & analysis ──────────────────────────── -->
    <section class="gf-depth mb-20">
      <div class="flex flex-col items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
          <span class="gf-eyebrow">Qualifying</span>
          <span class="font-display text-[25px] font-semibold tracking-tight">How serious are they?</span>
        </div>

        <div v-if="lead.qualification" class="flex flex-col gap-4">

          <div class="flex flex-col">
            <span class="gf-eyebrow">Lead is looking to {{ lead.qualification.intent }}</span>
            <span class="font-display text-[25px] font-semibold tracking-tight">Qualifying Details</span>
          </div>
          <div>
            <div v-if="lead.qualification.intent === 'buy'">
              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Time Line</span><span>{{
                  qualificationAnswer('q_timeline') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Financing</span><span>{{
                  qualificationAnswer('q_financing') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Lender</span><span>{{
                  qualificationAnswer('q_lender') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Budget</span><span>{{
                  qualificationAnswer('q_budget_max') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Must Haves</span><span>{{
                  qualificationAnswer('q_must_haves') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Deal Breakers</span><span>{{
                  qualificationAnswer('q_deal_breakers') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Current Situation</span><span>{{
                  qualificationAnswer('q_current_situation') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Areas they are considering</span><span>{{ qualificationAnswer('q_areas') }}</span>
              </div>
            </div>

            <div v-if="lead.qualification.intent === 'sell'" class="flex flex-col gap-2">
              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Time Line</span><span>{{
                  qualificationAnswer('q_timeline') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Reason</span><span>{{
                  qualificationAnswer('q_reason') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Price Expectation</span><span>{{
                  qualificationAnswer('q_price_expectation')}}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Price Basis</span><span>{{
                  qualificationAnswer('q_price_basis')}}</span>
              </div>

              <div>
                <span
                  class="text-[18px] font-semibold tracking-tight pr-2">Mortage</span><span>{{ `$${qualificationAnswer('q_mortgage')}` }}</span>
              </div>

              <div>
                <span
                  class="text-[18px] font-semibold tracking-tight pr-2">Conditions</span><span>{{ qualificationAnswer('q_condition') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Improvements
                  Done</span><span>{{ qualificationAnswer('q_improvements') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Listed
                  Before</span><span>{{ qualificationAnswer('q_listed_before') }}</span>
              </div>

              <div>
                <span class="text-[18px] font-semibold tracking-tight pr-2">Also
                  Buying</span><span>{{ qualificationAnswer('q_buying_too') }}</span>
              </div>

              <div>
                <span
                  class="text-[18px] font-semibold tracking-tight pr-2">Flexibility</span><span>{{ qualificationAnswer('q_flexibility') }}</span>
              </div>

              <div>
                <span
                  class="text-[18px] font-semibold tracking-tight pr-2">Decision</span><span>{{ qualificationAnswer('q_decision') }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button :disabled="analysing"
              class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors disabled:opacity-40"
              @click="runAnalysis">
              {{ analysing ? 'Thinking…' : analysis ? 'Re-run analysis' : 'Run analysis' }}
            </button>
            <p v-if="analysis?.source === 'scorecard-only'" class="text-[12.5px] text-[#A9A39A]">
              Scorecard only — add an AI key for the written read.
            </p>
          </div>
        </div>
      </div>

      <!-- Not yet sent -->
      <div v-if="!qual.sentAt && !qual.completedAt" class="bg-[#EFEAE0] border border-[#DDD6C9] p-7">
        <p class="font-display text-[18px] mb-2">Send them the deep-dive questions</p>
        <p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[56ch] mb-6">
          About twelve questions — timeline, financing, what would rule a house
          out. Takes them five minutes and gives you enough to actually read the
          situation before your next call.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <select v-model="intent"
            class="bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[14px] focus:outline-none focus:border-[#B5563A]">
            <option value="buy">Buyer questions</option>
            <option value="sell">Seller questions</option>
          </select>

          <button :disabled="sendingQuestionnaire || !lead?.email"
            class="px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            @click="sendQuestionnaire">
            {{ sendingQuestionnaire ? 'Sending…' : 'Send questionnaire' }}
          </button>
        </div>

        <p v-if="!lead?.email" class="text-[12.5px] text-[#B5563A] mt-3">
          This lead has no email address, so there's nowhere to send it.
        </p>
      </div>

      <!-- Sent, waiting on them -->
      <div v-else-if="qual.sentAt && !qual.completedAt" class="bg-[#EFEAE0] border border-[#DDD6C9] p-7">
        <p class="font-display text-[18px] mb-2">Sent — waiting on their answers</p>
        <p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[56ch] mb-6">
          They haven't finished it yet. Worth a mention next time you speak —
          it's the fastest way to make your next conversation useful.
        </p>
        <button :disabled="sendingQuestionnaire"
          class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors disabled:opacity-40"
          @click="sendQuestionnaire">
          {{ sendingQuestionnaire ? 'Sending…' : 'Send it again' }}
        </button>
      </div>

      <!-- Completed -->
      <div v-else>
        <!-- Scorecard -->
        <div v-if="analysis" class="grid sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9] mb-8">
          <div class="bg-[#F7F4EF] p-7">
            <p class="gf-eyebrow mb-3">Readiness</p>
            <p class="font-display text-[42px] font-semibold leading-none tabular-nums">
              {{ analysis.scorecard.readiness }}<span class="text-[18px] text-[#A9A39A]">/100</span>
            </p>
            <p class="text-[13px] text-[#8A847C] mt-2">{{ analysis.scorecard.readinessLabel }}</p>
          </div>
          <div class="bg-[#F7F4EF] p-7">
            <p class="gf-eyebrow mb-3">Financing</p>
            <p class="font-display text-[26px] font-semibold capitalize"
              :class="analysis.scorecard.financingRisk === 'high' ? 'text-[#B5563A]' : ''">
              {{ analysis.scorecard.financingRisk }}
            </p>
            <p class="text-[13px] text-[#8A847C] mt-2">
              {{ analysis.scorecard.financingRisk === 'high'
                ? 'Most likely thing to stall this'
                : analysis.scorecard.financingRisk === 'low' ? 'Not a concern' : 'Worth confirming' }}
            </p>
          </div>
          <div class="bg-[#F7F4EF] p-7">
            <p class="gf-eyebrow mb-3">Answered</p>
            <p class="font-display text-[42px] font-semibold leading-none tabular-nums">{{ answeredCount }}</p>
            <p class="text-[13px] text-[#8A847C] mt-2">questions completed</p>
          </div>
        </div>

        <!-- The read -->
        <div v-if="analysis?.read" class="bg-[#EFEAE0] border border-[#DDD6C9] p-7 mb-6">
          <p class="gf-eyebrow mb-3">The read</p>
          <p class="text-[15px] leading-[1.75] max-w-[70ch]">{{ analysis.read }}</p>
        </div>

        <!-- Signals & gaps -->
        <div class="grid sm:grid-cols-2 gap-6 mb-6">
          <div v-if="analysis?.scorecard?.signals?.length">
            <p class="gf-eyebrow mb-3">What stands out</p>
            <ul class="space-y-2.5">
              <li v-for="s in analysis?.scorecard.signals" :key="s" class="flex gap-3 text-[13.5px] leading-relaxed">
                <span class="w-1.5 h-1.5 bg-[#B5563A] mt-2 shrink-0" />
                <span>{{ s }}</span>
              </li>
            </ul>
          </div>
          <div v-if="analysis?.scorecard?.gaps?.length">
            <p class="gf-eyebrow mb-3">Still unknown</p>
            <ul class="space-y-2.5">
              <li v-for="g in analysis?.scorecard.gaps" :key="g"
                class="flex gap-3 text-[13.5px] leading-relaxed text-[#8A847C]">
                <span class="w-1.5 h-1.5 border border-[#A9A39A] mt-2 shrink-0" />
                <span>{{ g }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Next steps -->
        <div v-if="analysis?.nextSteps?.length" class="border-t border-[#DDD6C9] pt-6 mb-6">
          <p class="gf-eyebrow mb-4">Do this next</p>
          <ol class="space-y-3">
            <li v-for="(n, i) in analysis.nextSteps" :key="n" class="flex gap-4 text-[14.5px] leading-relaxed">
              <span
                class="font-display text-[13px] text-[#B5563A] border border-[#B5563A] w-6 h-6 flex items-center justify-center shrink-0">
                {{ Number(i) + 1 }}
              </span>
              <span>{{ n }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ── Contact ───────────────────────────────────────────── -->
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
            <div v-for="f in facts" :key="f.label"
              class="flex justify-between items-baseline gap-6 border-b border-[#DDD6C9] py-3.5">
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
    <!-- <ClientOnly>
      <section v-if="lead?.ai_analysis" class="gf-depth">
        <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
          <span class="gf-eyebrow">03 — Analysis</span>
          <span class="font-display text-[25px] font-semibold tracking-tight">The read on this lead</span>
        </div>
        <div class="bg-[#EFEAE0] border border-[#DDD6C9] p-9 relative">
          <span class="absolute top-5 right-5 gf-eyebrow text-[#A9A39A]">AI generated</span>
          <p class="text-[15px] leading-[1.75] max-w-[70ch]" v-html="lead?.ai_analysis?.read" />
        </div>
      </section>
    </ClientOnly> -->

  </div>
</template>
