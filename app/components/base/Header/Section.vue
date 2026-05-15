<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true,
        default: 'Header'
    },
    subText: {
        type: String,
    },
})
</script>

<template>
    <h2 class="text-lg font-bold tracking-tighter" v-html="text"></h2>
    <span v-if="subText" class="font-bold tracking-tighter" v-html="subText" />
</template>