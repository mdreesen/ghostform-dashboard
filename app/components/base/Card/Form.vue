<script setup lang="ts">
import type { Home } from '~/types/home';
const address = ref('');

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    badge: {
        type: String,
        default: ''
    },
    badgeClass: {
        type: String,
        default: ''
    },
    useForm: {
        type: Object,
        default: () => { }
    },
    qr_code_url: {
        type: String
    },
    value: {
        type: String
    },
    data: {
        type: Array<Home>,
        default: () => []
    },
});

</script>

<template>
    <div
        class="absolute inset-0 bg-radial from-slate-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
    </div>

    <!-- Left Info Segment -->
    <div class="flex items-start gap-4 max-w-2xl relative z-10">
        <!-- Dynamic Vector Accent Icon Wrapper -->
        <div
            class="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 group-hover:text-cyan-400 group-hover:border-slate-700 transition-colors shrink-0 hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="icon" />
            </svg>
        </div>

        <div class="space-y-1.5">
            <div class="flex items-center gap-3">
                <h3 class="text-base font-black text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                    {{ label }}
                </h3>
                <span :class="badgeClass"
                    class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border">
                    {{ badge }}
                </span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed font-medium">
                {{ description }}
            </p>
        </div>
    </div>

    <!-- Right Action Pipeline Controls -->
    <div
        class="flex sm:items-center gap-3 shrink-0 relative z-10 flex-row md:flex-col lg:flex-row w-full md:w-auto border-t border-slate-800/50 md:border-none pt-4 md:pt-0">
        <UModal fullscreen :title="`${label} QR Code`">
            <UButton label="QR Code" color="neutral" variant="subtle"
                class="bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold w-37.75 justify-center hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all" />

            <template #body>

                <div v-if="data.length > 0">
                    <select id="status-select" v-model="address"
                        class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option disabled value="">Choose home</option>
                        <option v-for="(item, index) in data" :value="item.address" :key="index">
                            {{ item.name ?? item?.address }}
                        </option>
                    </select>

                    <div v-if="address" class="pt-10">
                        <baseHeaderSection :text="`Chosen Address<br>${address}`" />
                    </div>
                </div>

                <baseQrCode class="p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130"
                    :value="`${qr_code_url}${address ? `&${address}` : ''}`" />
            </template>
        </UModal>

        <!-- STANDALONE DEEP LINK ANCHOR BUTTON -->
        <NuxtLink :to="qr_code_url" target="_blank"
            class="flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2 w-full border border-slate-800 hover:border-slate-600 hover:bg-slate-800/40 text-slate-300 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-wider transition-all">
            Launch Portal
        </NuxtLink>
    </div>
</template>