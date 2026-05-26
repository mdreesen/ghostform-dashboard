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

const leads_new = leads.value.status.find((item) => item.label.includes('new'));
const leads_active = leads.value.status.find((item) => item.label.includes('active'));

const cardData = computed(() => [
  { title: 'Total Intake', value: `${leads.value.all?.length ?? 0}` },
  { title: 'Active Leads', value: `${leads_active.leads.length ?? 0}` },
  { title: 'New Leads', value: `${leads_new.leads.length ?? 0}` }
]
);
</script>

<template>
  <div>
    <appHeader :label="user?.company" :subLabel="user?.category" />

    <main class="max-w-350 mx-auto relative z-10">

      <section class="flex flex-wrap justify-between gap-6 mb-12">
        <template v-if="leads" v-for="data in cardData">
          <ClientOnly>
            <baseCardDetail :label="data.title" :value="data.value" />
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