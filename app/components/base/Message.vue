<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    communication_type: {
        type: String,
        required: true
    },
    message_type: {
        type: String,
        default: 'sms',
        required: true
    },
    icon: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <a :href="`${message_type}:${communication_type}`" class="text-[#1F1B16] hover:text-[#4C5741] underline underline-offset-2 decoration-[#C7BFAF] hover:decoration-[#4C5741] font-medium transition-colors">
    <span v-html="label"></span>
</a>

</template>