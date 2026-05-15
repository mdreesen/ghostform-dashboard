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
  <div v-if="!pending_data" class="min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden">
    
    <main class="max-w-5xl mx-auto relative z-10">

      <section class="flex flex-wrap gap-8 mb-12">
        <div>
          <div class="flex items-center gap-6">
            <baseHeaderAuth :text="lead?.name" />

              <baseButtonNavigate class="w-25" text="Edit" :path="`/dashboard/leads/${route.params.id}/edit`" />
          </div>
          <div class="flex flex-wrap gap-6 mt-5 text-zinc-400">
            <div class="flex flex-col">
              <baseHeaderSection text="Email" :subText="lead?.email" />
            </div>
            <div class="flex flex-col">
              <baseHeaderSection text="Phone" :subText="lead?.phone" />
            </div>
            <div class="flex flex-col">
              <baseHeaderSection text="Address" :subText="lead?.address" />
            </div>
            <div class="flex flex-col">
              <baseHeaderSection text="Status" :subText="lead?.status" />
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-4 space-y-8">
          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">
            <baseHeaderSection text="Lead Submission" />
            <div class="space-y-6">
              <div v-for="(val, label) in { 
                'Est. Value':lead?.price ? `$${lead?.price?.toLocaleString()}` : '', 
                'Budget': `$${lead?.budget?.toLocaleString() ?? ''}`,
                'Sq Footage': lead?.sqft ? `${lead?.sqft} ft²` : '',
                'Intent (Buy, Sell, or Both)': lead?.buy_sell_both 
              }" :key="label" class="flex justify-between items-end border-b border-white/5 pb-2">
                <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{{ label }}</span>
                <span class="text-sm font-bold">{{ val }}</span>
              </div>
            </div>
          </div>

          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">
            <baseHeaderSection text="Other Details" />
            <p class="text-sm text-zinc-300 leading-relaxed italic-none">"{{ lead?.message ? lead?.message : 'No other details' }}"</p>
          </div>
        </div>

        <ClientOnly>
        <div class="lg:col-span-8 space-y-8">
          <div class="backdrop-blur-xl bg-white/4 border border-cyan-400/20 rounded-3xl p-10 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
              <span class="text-[8px] font-black bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded tracking-widest">AI GEN</span>
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