<script setup lang="ts">
import { selection_campaign_status_lead, selection_days, selection_frequencies } from '~/utils/dropdowns/selections';

definePageMeta({ layout: 'authenticated' });

useHead({
  title: 'GhostForm | Campaigns',
  meta: [{ name: 'description', content: 'Automated follow-up emails that run on their own.' }],
});

const isSaving = ref(false);
const toast = useToast();
const { fetch: refreshSession } = useUserSession();
const { data: campaigns } = useNuxtData<any>('campaigns');

const useCampaigns = computed(() => campaigns.value ?? []);
const activeCount = computed(() =>
  useCampaigns.value.filter((c: any) => c?.active !== false).length
);

const TOKEN_NAME = '{' + '{name}' + '}';
const TOKEN_AGENT = '{' + '{agent}' + '}';

const form = ref({
  title: '',
  // On by default — identical copy every week reads as automated and
  // scores badly with spam filters.
  varyWording: true,
  targetStatus: 'new',
  subject: '',
  messageBody: '',
  dayOfWeek: '1',
  timesPerMonth: '4'
});

// Suggest a starting template when the audience changes — but never overwrite
// something the realtor has already written.
watch(() => form.value.targetStatus, (newStatus) => {
  if (form.value.messageBody !== '') return;

  if (newStatus === 'new') {
    form.value.subject = 'Quick question regarding your property search';
    form.value.messageBody = "Hi {{name}},\n\nI wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?\n\nJust reply straight to this email whenever you have a second.\n\nBest,\n\n{{agent}}";
  } else if (newStatus === 'active') {
    form.value.subject = 'Quick market update for you';
    form.value.messageBody = "Hi {{name}},\n\nWe've been keeping a close eye on the market for you. As we keep sorting through local inventory, do you have any quick questions about recent listings or pricing adjustments?\n\nJust reply straight to this email whenever you have a second.\n\nBest,\n\n{{agent}}";
  }
}, { immediate: true });

const saveCampaignTemplate = async () => {
  if (!form.value.subject || !form.value.messageBody) return;
  isSaving.value = true;

  try {
    await $fetch('/api/campaigns/save', { method: 'POST', body: form.value });
    await refreshSession();
    await refreshNuxtData('campaigns');
    toast.success('Campaign saved — it will start sending on schedule.');
    form.value.title = '';
  } catch (error) {
    toast.error('Could not save the campaign. Please try again.');
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="max-w-[1240px] mx-auto">

    <!-- ── Page head ─────────────────────────────────────────── -->
    <header class="mb-20 pt-4">
      <p class="gf-eyebrow mb-5 gf-rise" style="--d:.05s">Follow-up on autopilot</p>
      <h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="--d:.12s">
        Stay in touch without remembering to.
      </h1>
      <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[48ch] gf-rise" style="--d:.2s">
        <template v-if="activeCount">
          {{ activeCount }} campaign{{ activeCount === 1 ? '' : 's' }} running. Each one emails
          every lead at a chosen stage, on the day and rhythm you set.
        </template>
        <template v-else>
          Set up an email that goes out on a schedule to every lead at a given stage —
          weekly, every other week, or monthly.
        </template>
      </p>
    </header>

    <!-- ── 01 Running ────────────────────────────────────────── -->
    <section class="gf-depth mb-24">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">01 — Running</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">Your campaigns</span>
        <span class="text-[13px] text-[#A9A39A] tabular-nums">{{ useCampaigns.length }}</span>
      </div>

      <div v-if="useCampaigns.length" class="flex flex-wrap gap-6">
        <baseCardCampaign v-for="item in useCampaigns" :key="item._id" :data="item" />
      </div>

      <div v-else class="border-t border-b border-[#DDD6C9] py-14 text-center">
        <p class="text-[14px] text-[#8A847C]">
          No campaigns yet. Build your first one below — it starts sending automatically.
        </p>
      </div>
    </section>

    <!-- ── 02 New campaign ───────────────────────────────────── -->
    <section class="gf-depth">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">02 — New</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">Build a campaign</span>
      </div>

      <form class="grid lg:grid-cols-3 gap-8" @submit.prevent="saveCampaignTemplate">

        <!-- Who and when -->
        <div class="space-y-6 bg-[#EFEAE0] border border-[#DDD6C9] p-7 h-fit">
          <p class="gf-eyebrow">Who and when</p>

          <UFormField label="Name it (just for you)">
            <UInput v-model="form.title" placeholder="Monday check-in" class="w-full" />
          </UFormField>

          <UFormField label="Send to leads at this stage">
            <USelect v-model="form.targetStatus" :items="selection_campaign_status_lead" class="w-full" />
          </UFormField>

          <UFormField label="Which day">
            <USelect v-model="form.dayOfWeek" :items="selection_days" class="w-full" />
          </UFormField>

          <UFormField label="How often">
            <USelect v-model="form.timesPerMonth" :items="selection_frequencies" class="w-full" />
          </UFormField>

          <p class="text-[12px] text-[#A9A39A] leading-relaxed pt-1">
            Emails go out in the morning on the day you pick.
          </p>

          <label class="flex items-start gap-3 pt-2 cursor-pointer">
            <input v-model="form.varyWording" type="checkbox" class="mt-1 accent-[#B5563A]" />
            <span>
              <span class="block text-[13px] font-medium">Reword it slightly each time</span>
              <span class="block text-[12px] text-[#A9A39A] leading-relaxed mt-0.5">
                Keeps the same meaning, but says it a bit differently each send — so
                people on a long sequence don't get the identical email every week.
              </span>
            </span>
          </label>
        </div>

        <!-- What it says -->
        <div class="lg:col-span-2 space-y-6 bg-[#EFEAE0] border border-[#DDD6C9] p-7">
          <p class="gf-eyebrow">What it says</p>

          <UFormField label="Subject line">
            <UInput v-model="form.subject" placeholder="Checking in on your home search" class="w-full" />
          </UFormField>

          <UFormField label="Message">
            <UTextarea v-model="form.messageBody" :rows="12" class="w-full text-sm leading-relaxed" />
          </UFormField>

          <div class="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p class="text-[12px] text-[#A9A39A] leading-relaxed">
              Use <code class="text-[#B5563A]">{{ TOKEN_NAME }}</code> for the lead's first name
              and <code class="text-[#B5563A]">{{ TOKEN_AGENT }}</code> for yours.
            </p>
            <button
              type="submit"
              :disabled="isSaving || !form.subject || !form.messageBody"
              class="px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {{ isSaving ? 'Saving…' : 'Save & start' }}
            </button>
          </div>
        </div>
      </form>
    </section>

  </div>
</template>
