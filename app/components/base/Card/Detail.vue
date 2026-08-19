<script setup lang="ts">

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    value: {
        type: String
    },
});
</script>

<template>
    <div :key="label" class="p-3 bg-slate-900 border border-[#DDD6C9] group-hover:text-[#B5563A] group-hover:border-[#DDD6C9] transition-colors shrink-0 sm:block w-full sm:w-full md:w-full lg:w-75">
        <p class="text-[10px] font-bold uppercase tracking-widest text-[#8A847C] mb-4">{{ label }}</p>
        <p class="text-3xl font-bold tabular-nums">{{ value }}</p>
    </div>
</template>