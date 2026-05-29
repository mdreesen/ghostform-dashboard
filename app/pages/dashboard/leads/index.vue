<script setup lang="ts">
import { capitalizeFirstLetter } from '~/composables/useCapitalizeFirstLetter';

definePageMeta({
  layout: 'authenticated',
});

const { data: leads } = useNuxtData('leads');
</script>

<template>
  <div>

    <section class="flex flex-wrap justify-between">
      <appHeader label="Lead Archive" subLabel="Intake Intelligence" />
      <baseButtonNavigate text="+ Create Lead" path="/dashboard/leads/create" />
    </section>

    <main class="max-w-7xl mx-auto relative z-10">
      <section class="flex flex-col gap-10">

        <template v-for="item in leads?.status">
          <div class="space-y-6 w-full">
            <div class="flex justify-between items-end mb-4">
              <baseHeaderSection v-if="leads" :text="capitalizeFirstLetter(item.label)" />
              <baseButtonExport :data="item.leads" />
            </div>

            <ClientOnly>
              <baseTable v-if="leads" :data="item.leads" />
            </ClientOnly>
          </div>
        </template>

        <!-- All Leads -->
        <div class="space-y-6 w-full">
          <div class="flex justify-between items-end mb-4">
            <baseHeaderSection v-if="leads" text="All Leads" />
            <baseButtonExport :data="leads.map((item: any) => item.all)" />
          </div>

          <ClientOnly>
            <baseTable v-if="leads" :data="leads.all" />
          </ClientOnly>
        </div>
      </section>
    </main>
  </div>
</template>