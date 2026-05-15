<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true,
        default: 'Save'
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    isLoadingText: {
        type: String,
        default: 'Please wait...'
    }
})
</script>

<template>
    <button type="submit" :disabled="isLoading"
    :class="`${isLoading ? 'bg-linear-to-r from-gray-500 to-gray-600' : 'bg-cyan-500 hover:bg-cyan-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900'} w-full rounded-xl py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out`">
    {{ isLoading ? props.isLoadingText : text }}
    </button>
</template>