<script setup lang="ts">
const props = defineProps({
    address: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="flex flex-col">
        <a :href="`https://maps.google.com/?q=${encodeURIComponent(address)}`" target="_blank" rel="noopener noreferrer"
            class="text-[#1F1B16] hover:text-[#4C5741] underline underline-offset-2 decoration-[#C7BFAF] hover:decoration-[#4C5741] font-medium transition-colors">
            <span>{{ address }}</span>
        </a>
    </div>
</template>