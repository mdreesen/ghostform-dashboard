<script setup lang="ts">
import { exportLeadsCSV } from '~/utils/csv';
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
            <baseButton @click="exportLeadsCSV(leads.new)" :text="`Export ${item?.label} csv`" />
          </div>

          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden w-full">
            <ClientOnly>
              <baseTable v-if="leads" :data="item.leads" />
            </ClientOnly>
          </div>
        </div>
        </template>

        <!-- All Leads -->
        <div class="space-y-6 w-full">
          <div class="flex justify-between items-end mb-4">
            <baseHeaderSection v-if="leads" text="All Leads" />
            <baseButton @click="exportLeadsCSV(leads.all)" text="EXPORT CSV" />
          </div>

          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden w-full">
            <ClientOnly>
              <baseTable v-if="leads" :data="leads.all" />
            </ClientOnly>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>