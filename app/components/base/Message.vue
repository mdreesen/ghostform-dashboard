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
    <a :href="`${message_type}:${communication_type}`" class="text-cyan-400 hover:text-cyan-700 underline font-medium">
    <span v-html="label"></span>
</a>

</template>