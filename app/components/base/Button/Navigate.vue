<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true,
        default: 'Button'
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        default: "/"
    },
    css: {
        type: String,
        defaut: ''
    }
})
</script>

<template>
    <nuxt-link :to="path">
        <button
        :class="`flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/40 text-slate-300 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${css}`">
        {{ text }}
        </button>
    </nuxt-link>
</template>