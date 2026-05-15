<script setup lang="ts">
import { exportLeadsCSV } from '~/utils/csv';
definePageMeta({
  layout: 'authenticated',
});

const { data: leads } = useNuxtData('leads');

</script>

<template>
  <div class="min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden">
    
    <div class="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#30cf43] rounded-full blur-[180px] opacity-[0.03]"></div>

    <main class="max-w-7xl mx-auto relative z-10">
      
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <baseHeaderAuth text="LEAD ARCHIVE" subText="Intake Intelligence" />
        </div>
        
        <div class="flex gap-4">
          <baseButton @click="exportLeadsCSV(leads)" text="EXPORT CSV" />
        </div>
      </header>

      <div class="backdrop-blur-2xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <baseTable :data="leads" />
      </div>
    </main>
  </div>
</template>