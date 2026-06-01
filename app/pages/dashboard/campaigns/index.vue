<script setup lang="ts">
const isSaving = ref(false)
const toast = useToast();
import { selection_campaign_status_lead, selection_days, selection_frequencies } from '~/utils/dropdowns/selections';

definePageMeta({
  layout: 'authenticated',
});

const { data: campaigns } = useNuxtData('campaigns');
const useCampaigns = computed(() => campaigns.value);

const form = ref({
  title: '',
  targetStatus: 'new',
  subject: '',
  messageBody: '',
  dayOfWeek: '1', // Default to Mondays
  timesPerMonth: '4' // Default to Weekly
});

// Update text helper when status modifies to suggest a good template baseline
watch(() => form.value.targetStatus, (newStatus) => {
  if (form.value.messageBody !== '') return // Don't overwrite active user text

  if (newStatus === 'new') {
    form.value.subject = 'Quick question regarding your property search'
    form.value.messageBody = "Hi {{name}},\n\nI wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?\n\nJust reply straight to this email whenever you have a second.\n\nBest,\n\n{{agent}}"
  } else if (newStatus === 'active') {
    form.value.subject = 'Quick market update for you'
    form.value.messageBody = "Hi {{name}},\n\nWe've been keeping a close eye on the market for you. As we keep sorting through local inventory, do you have any quick questions about recent listings or pricing adjustments?\n\nJust reply straight to this email whenever you have a second.\n\nBest,\n\n{{agent}}"
  }
}, { immediate: true })

const saveCampaignTemplate = async () => {
  if (!form.value.subject || !form.value.messageBody) return
  isSaving.value = true

  try {
    await $fetch('/api/campaigns/save', {
      method: 'POST',
      body: form.value
    })
    await refreshNuxtData('campaigns');

    toast.success(
      'Automation Workflow Live',
      'Your recurring campaign criteria parameters have been saved.'
    )

  } catch (error) {
    toast.error('Failed to mount criteria templates.');
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div>
    <appHeader label="Campaign Orchestrator" subLabel="Manage your emails" />

    <div class="flex flex-col gap-12">
      <section>
        <baseHeaderSection text="Current Campaigns" />
        <div class="flex flex-wrap gap-6">
          <template v-for="item in useCampaigns">
            <baseCardCampaign :data="item" />
          </template>
        </div>
      </section>

      <section>
        <baseHeaderSection text="Create new campaigns" />

        <form @submit.prevent="saveCampaignTemplate" class="grid md:grid-cols-3 gap-6">
          <!-- Scheduling Adjustments Dashboard Column -->
          <div class="space-y-4 bg-zinc-900/30 border border-white/5 p-6 rounded-2xl h-fit">
            <baseHeaderSection text="Recurrence Intervals" />

            <UFormField label="Campaign Title Name">
              <UInput v-model="form.title" placeholder="Monday Morning Followup" class="w-full" />
            </UFormField>

            <UFormField label="Target Audience Tier">
              <USelect v-model="form.targetStatus" :items="selection_campaign_status_lead" class="w-full" />
            </UFormField>

            <UFormField label="Preferred Dispatch Day">
              <USelect v-model="form.dayOfWeek" :items="selection_days" class="w-full" />
            </UFormField>

            <UFormField label="Monthly Frequency Density">
              <USelect v-model="form.timesPerMonth" :items="selection_frequencies" class="w-full" />
            </UFormField>
          </div>

          <!-- Copywriting Panel Column -->
          <div class="md:col-span-2 space-y-5 bg-zinc-900/10 border border-white/5 p-6 rounded-3xl">
            <UFormField label="Drip Campaign Subject Line">
              <UInput v-model="form.subject" placeholder="Checking in on your property parameters..." class="w-full" />
            </UFormField>

            <UFormField label="Communication Script Body Text (Plain)">
              <UTextarea v-model="form.messageBody" :rows="10" class="w-full text-sm leading-relaxed" />
            </UFormField>

            <div class="flex justify-between items-center pt-2">
              <baseButton :loading="isSaving" text="save & start campaign" />
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>