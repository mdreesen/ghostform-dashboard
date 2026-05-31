<script setup lang="ts">

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
const { data: charts_lead } = useNuxtData('charts_lead');

const chart_data = computed(() => charts_lead?.value.monthly);
</script>

<template>
  <div>
    <appHeader :label="user?.company" :subLabel="user?.category" />

    <main class="flex flex-col gap-18 max-w-350 mx-auto relative z-10">

      <section class="flex flex-col">
        <baseHeaderSection text="Overview" />
        <div class="flex flex-wrap justify-between gap-6">
          <appCardsOverview v-if="leads?.all" :leads="leads" />
        </div>
      </section>

      <section class="flex flex-col ">
        <baseHeaderSection text="Lead Charts" />

        <div class="flex flex-wrap justify-evenly gap-18">
          <ClientOnly>
            <baseChartsLine v-if="chart_data" :data="chart_data" />
          </ClientOnly>

          <ClientOnly>
            <baseChartsDonut v-if="chart_data" :data="chart_data" />
          </ClientOnly>
        </div>
      </section>

      <section class="space-y-6 w-full">
        <baseHeaderSection text="Lead Tracking" />
        <ClientOnly>
          <baseTable v-if="leads" :data="leads?.all" />
        </ClientOnly>
      </section>
    </main>
  </div>
</template>