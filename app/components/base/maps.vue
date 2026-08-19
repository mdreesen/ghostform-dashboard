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
            class="text-[#B5563A] hover:text-[#8f4229] underline font-medium">
            <span>{{ address }}</span>
        </a>
    </div>
</template>