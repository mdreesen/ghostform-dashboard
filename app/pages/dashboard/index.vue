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
</script>

<template>
  <div>
    <appHeader :label="user?.company" :subLabel="user?.category" />

    <main class="max-w-350 mx-auto relative z-10">

      <section class="flex flex-wrap justify-between gap-6 mb-12">
        <baseHeaderSection text="Overview" />
        <appCardsOverview v-if="leads?.all" :leads="leads" />
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