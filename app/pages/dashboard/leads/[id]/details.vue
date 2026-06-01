<script setup lang="ts">
import type { Lead } from '~/types/lead';
definePageMeta({
  layout: 'authenticated',
});

const route = useRoute();

const { data: data, pending: pending_data } = await useFetch<Lead>(`/api/leads/${route.params.id}`);

const lead = ref(data.value);
</script>

<template>
  <div v-if="!pending_data">

    <main class="max-w-5xl mx-auto relative z-10">

      <section class="flex flex-wrap gap-8 mb-12">
        <div>
          <div class="flex items-center gap-6">
            <baseHeaderAuth :text="lead?.name" />

            <baseButtonNavigate class="w-25" text="Edit" :path="`/dashboard/leads/${route.params.id}/edit`" />
          </div>
          <div class="flex flex-wrap gap-6 mt-5 text-zinc-400">
            <div class="flex flex-col">
              <baseHeaderSection text="Email" />
              <baseMessage :label="lead?.email" message_type="mailto" communication_type="email" />
            </div>
            <div class="flex flex-col">
              <baseHeaderSection text="Phone" />
              <baseMessage :label="lead?.phone" message_type="sms" communication_type="phone" />
            </div>
            <div class="flex flex-col">
              <baseHeaderSection text="Address" />
              <baseMaps :address="lead?.address" />
            </div>
            <div class="flex flex-col">
              <baseHeaderSection text="Status" :subText="lead?.status" />
            </div>
            <div>
              <baseHeaderSection text="Send Emails" />

              <UModal :title="`Send out email`">
                <UButton label="Send emails" color="neutral" variant="subtle"
                  class="bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all" />

                <template #body>
                  <appReminderEmail :leadId="lead?._id" :currentStatus="lead?.status"  />
                </template>
              </UModal>
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div class="lg:col-span-4 space-y-8">
          <div v-if="lead?.buy_sell_both" class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">
            <baseHeaderSection text="Lead Submission" />
            <div class="space-y-6">
              <div v-for="(val, label) in {
                'Est. Value': lead?.price ? `$${lead?.price?.toLocaleString()}` : 'Not Provided',
                'Budget': `${lead?.budget?.toLocaleString() ? `$${lead?.budget?.toLocaleString()}` : 'Not Provided'}`,
                'Sq Footage': lead?.sqft ? `${lead?.sqft} ft²` : 'Not Provided',
                'Intent (Buy, Sell,<br>or Both)': lead?.buy_sell_both ? lead?.buy_sell_both : 'Not Provided'
              }" :key="label" class="flex justify-between items-end border-b border-white/5 pb-2">

                <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" v-html="label" />
                <span class="text-sm font-bold" v-html="val" />
              </div>
            </div>
          </div>

          <div v-if="lead?.notes" class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">
            <baseHeaderSection text="Other Notes" />
            <p class="text-sm text-zinc-300 leading-relaxed italic-none">"{{ lead?.notes ? lead?.notes : 'No other notes' }}"
            </p>
          </div>
        </div>

        <ClientOnly>
          <div v-if="lead?.ai_analysis" class="lg:col-span-8 space-y-8">
            <div
              class="backdrop-blur-xl bg-white/4 border border-cyan-400/20 rounded-3xl p-10 relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4">
                <span class="text-[8px] font-black bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded tracking-widest">AI
                  GEN</span>
              </div>
              <baseHeaderSection text="AI Analysis" />
              <p class="text-sm leading-relaxed" v-html="lead?.ai_analysis" />
            </div>
          </div>
        </ClientOnly>

      </div>
    </main>
  </div>
</template>