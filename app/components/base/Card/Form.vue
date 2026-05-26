<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    useForm: {
        type: Object,
        default: () => {}
    },
    qr_code_url: {
        type: String
    },
    value: {
        type: String
    },
});

</script>

<template>
    <div :key="label" class="backdrop-blur-xl bg-white/2 border border-white/8 p-8 rounded-3xl w-full sm:w-full md:w-full lg:w-75">
        <baseHeaderSection :text="label" />

        <UModal fullscreen title="QR Code">
          <UButton label="QR Code" color="neutral" variant="subtle"
            class="bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all" />

          <template #body>
            <baseQrCode class="p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130"
              :value="qr_code_url" />
          </template>
        </UModal>

        <!-- <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">{{ label }}</p> -->
        <p class="text-3xl font-bold tabular-nums">{{ value }}</p>
    </div>
</template>