<script setup lang="ts">
const props = defineProps({
    value: {
        type: String,
        required: true
    }
})
</script>

<template>
      <Qrcode :value="value" />

  <!-- <div class="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl text-center">
    <p class="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">
      Unique Node: {{ agentName }}
    </p>
    
    <div class="bg-white p-4 rounded-2xl inline-block mb-6">
      <img :src="`/api/qr/${qrSlug}`" class="w-48 h-48" alt="GhostNode" />
    </div>

    <button class="w-full py-3 bg-zinc-800 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#30cf43] hover:text-black transition-all">
      Download Dispatch Kit
    </button>
  </div> -->
</template>