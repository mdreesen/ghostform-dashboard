<script setup lang="ts">
const stats = [
    { label: 'Payload Reduction', value: '90%' },
    { label: 'Conversion Boost', value: '2.4x' },
    { label: 'Setup Time', value: '< 5m' },
    { label: "'Payload Too Large' Errors", value: '0%' },
    { label: 'Instant Interaction', value: '< 200ms' },
    { label: 'Mobile-First Design', value: '80%' }
];
</script>

<template>
    <div class="py-12 border-y border-white/5 bg-white/2">
        <baseHeaderBase text="Stats" />
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div v-for="s in stats" :key="s.label">
                <div class="text-4xl font-black text-white mb-1">{{ s.value }}</div>
                <div class="text-xs font-bold text-zinc-500 uppercase tracking-widest">{{ s.label }}</div>
            </div>
        </div>
    </div>
</template>