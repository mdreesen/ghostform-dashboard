<script setup lang="ts">
import { exportLeadsCSV } from '~/utils/csv';
definePageMeta({
  layout: 'authenticated',
});

const { data: leads } = useNuxtData('leads');

</script>

<template>
  <div>
    <appHeader label="Lead Archive" subLabel="Intake Intelligence" />

    <main class="max-w-7xl mx-auto relative z-10">
      <section class="flex flex-col gap-10">
        <!-- New Leads-->
        <div class="space-y-6 w-full">
          <div class="flex justify-between items-end mb-4">
            <baseHeaderSection v-if="leads" text="<span class='text-blue-400'>New</span> Leads" />
            <baseButton @click="exportLeadsCSV(leads.new)" text="EXPORT CSV" />
          </div>

          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden w-full">
            <ClientOnly>
              <baseTable v-if="leads" :data="leads.new" />
            </ClientOnly>
          </div>
        </div>

        <!-- Active Leads-->
        <div class="space-y-6 w-full">
          <div class="flex justify-between items-end mb-4">
            <baseHeaderSection v-if="leads" text="<span class='text-green-400'>Active</span> Leads" />
            <baseButton @click="exportLeadsCSV(leads.active)" text="EXPORT CSV" />
          </div>

          <div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden w-full">
            <ClientOnly>
              <baseTable v-if="leads" :data="leads.active" />
            </ClientOnly>
          </div>
        </div>

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