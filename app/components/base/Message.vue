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
    <a :href="`${message_type}:${communication_type}`" class="text-[#B5563A] hover:text-[#8f4229] underline font-medium">
    <span v-html="label"></span>
</a>

</template>