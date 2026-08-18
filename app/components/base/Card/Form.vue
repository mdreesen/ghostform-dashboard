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
            class="p-3 bg-slate-900 border border-[#DDD6C9] text-[#8A847C] group-hover:text-[#B5563A] group-hover:border-[#DDD6C9] transition-colors shrink-0 hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="icon" />
            </svg>
        </div>

        <div class="space-y-1.5">
            <div class="flex items-center gap-3">
                <h3 class="text-base font-semibold text-[#1F1B16] tracking-wide group-hover:text-[#B5563A] transition-colors">
                    {{ label }}
                </h3>
                <span :class="badgeClass"
                    class="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border">
                    {{ badge }}
                </span>
            </div>
            <p class="text-xs text-[#8A847C] leading-relaxed font-medium">
                {{ description }}
            </p>

            <div class="text-center pt-2" v-if="data.length > 0">
                <span>What home is this for?</span>
                <select id="status-select" v-model="address"
                    class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]">
                    <option disabled value="">Choose home</option>
                    <option v-for="(item, index) in data" :value="item.address" :key="index">
                        {{ item.name ?? item?.address }}
                    </option>
                </select>

                <div v-if="address" class="pt-10">
                    <baseHeaderSection :text="`Chosen Address<br>${address}`" />
                </div>
            </div>
        </div>
    </div>

    <!-- Right Action Pipeline Controls -->
    <div
        class="flex sm:items-center gap-3 shrink-0 relative z-10 flex-row md:flex-col lg:flex-row w-full md:w-auto border-t border-[#DDD6C9]/50 md:border-none pt-4 md:pt-0">
        <UModal fullscreen :title="`${label} QR Code`">
            <UButton label="QR Code" color="neutral" variant="subtle"
                class="bg-[#B5563A] text-[#F7F4EF] px-6 py-3 text-xs font-bold w-37.75 justify-center hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all" />

            <template #body>
                <div class="flex justify-center gap-4">
                    <baseQrCode class="relative top-[50%] max-w-150"
                        :value="`${qr_code_url}${address ? `&${address}` : ''}`" />
                </div>
            </template>
        </UModal>

        <!-- STANDALONE DEEP LINK ANCHOR BUTTON -->
        <NuxtLink :to="qr_code_url" target="_blank"
            class="flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2 w-full border border-[#DDD6C9] hover:border-[#A9A39A] hover:bg-slate-800/40 text-[#8A847C] hover:text-[#1F1B16] text-[11px] font-semibold uppercase tracking-wider transition-all">
            Launch Portal
        </NuxtLink>
    </div>
</template>