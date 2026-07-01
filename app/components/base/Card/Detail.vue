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
//         class="p-3 bg-slate-900 border border-slate-800 rounded-xl group-hover:text-cyan-400 group-hover:border-slate-700 transition-colors shrink-0 hidden sm:block">
// w-full sm:w-full md:w-full lg:w-75
</script>

<template>
    <div :key="label" class="p-3 bg-slate-900 border border-slate-800 rounded-xl group-hover:text-cyan-400 group-hover:border-slate-700 transition-colors shrink-0 hidden sm:block w-full sm:w-full md:w-full lg:w-75">
        <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">{{ label }}</p>
        <p class="text-3xl font-bold tabular-nums">{{ value }}</p>
    </div>
</template>