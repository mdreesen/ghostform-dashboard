<script setup lang="ts">
import { ghostFormUrl } from '~/utils/ghostFormUrl';

definePageMeta({
  layout: 'authenticated',
});

useHead({
  title: 'GhostForm | Main',
  meta: [
    { name: 'description', content: 'GhostForm Main Dashboard.' },
  ],
});

const { data: user } = useNuxtData('user');
const { data: leads } = useNuxtData('leads');
console.log(user.value)

const cardData = computed(() => [
  { title: 'Total Intake', value: `${leads.value.all?.length ?? 0}` },
  { title: 'Active Leads', value: `${leads.value?.active?.length ?? 0}` },
  { title: 'New Leads', value: `${leads.value?.new?.length ?? 0}` }
]
);
</script>

<template>
  <div class="min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden">

    <div class="absolute top-0 right-0 w-150 h-150 bg-cyan-400 rounded-full blur-[200px] opacity-[0.03]"></div>

    <header
      class="max-w-350 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 relative z-10">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <baseEngineActive />
        </div>
        <baseHeaderAuth v-if="user" :text="user?.company" :subText="user?.category" />
      </div>

      <div class="flex gap-4">

        <UModal fullscreen title="QR Code">
          <UButton label="QR Code" color="neutral" variant="subtle"
            class="bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all" />

          <template #body>
            <baseQrCode class="p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130"
              :value="ghostFormUrl(user?.category, user?.company_hashed, user?.email_hashed, user?.calendar_link)" />
          </template>
        </UModal>

      </div>
    </header>

    <main class="max-w-350 mx-auto relative z-10">

      <section class="flex flex-wrap justify-between gap-6 mb-12">
        <template v-if="leads" v-for="data in cardData">
          <ClientOnly>
            <baseCard :label="data.title" :value="data.value" />
          </ClientOnly>
        </template>
      </section>

      <div class="flex w-full">

        <div class="space-y-6 w-full">
          <div class="flex justify-between items-end mb-4">
            <baseHeaderSection v-if="leads" text="Lead Tracking" />
          </div>

          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden w-full">
            <ClientOnly>
              <baseTable v-if="leads" :data="leads.all" />
            </ClientOnly>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>