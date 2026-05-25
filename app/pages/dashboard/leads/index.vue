<script setup lang="ts">
import { exportLeadsCSV } from '~/utils/csv';
definePageMeta({
  layout: 'authenticated',
});

const { data: leads } = useNuxtData('leads');

</script>

<template>
  <div class="min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden">

    <div class="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#30cf43] rounded-full blur-[180px] opacity-[0.03]">
    </div>

    <main class="max-w-7xl mx-auto relative z-10">

      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <baseHeaderAuth text="LEAD ARCHIVE" subText="Intake Intelligence" />
        </div>
      </header>

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