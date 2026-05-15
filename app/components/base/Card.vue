<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    value: {
        type: Number,
    },
});
</script>

<template>
    <div :key="label" class="backdrop-blur-xl bg-white/2 border border-white/8 p-8 rounded-3xl w-full sm:w-full md:w-full lg:w-75">
        <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">{{ label }}</p>
        <p class="text-3xl font-bold tabular-nums">{{ value }}</p>
    </div>
</template>