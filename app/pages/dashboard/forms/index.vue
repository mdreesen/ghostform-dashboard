<script setup>
import { ref } from 'vue';
import { ghostFormUrl } from '~/utils/ghostFormUrl';

definePageMeta({
    layout: 'authenticated',
});

const { data: user } = useNuxtData('user');
const { data: home } = useNuxtData('homes');

// Local mock or state tracking for forms metadata
const formFunnels = ref([
    {
        id: 'data-entry',
        label: 'Data Entry Form',
        description: 'Internal administrative interface optimized for manual lead logging, phone-in prospects, and quick desk updates.',
        badge: 'Internal Admin',
        badgeClass: 'bg-slate-500/10 text-[#8A847C] border-slate-500/20',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586A1 1 0 0114 3.414L18.586 8A1 1 0 0119 8.586V19a2 2 0 01-2 2z',
        form_url: ghostFormUrl(user.value?.category, 'on_market', user.value?._id, user.value?.company_hashed, user.value?.email_hashed, user.value?.calendar_link)
    },
    {
        id: 'open-house',
        label: 'Open House Check-In',
        description: 'High-speed, mobile-optimized physical guest registry. Captures immediate intent, contact metrics, and agent compliance data on-site.',
        badge: 'QR Optimized',
        badgeClass: 'bg-[#B5563A]/10 text-[#B5563A] border-[#B5563A]/30',
        icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        form_url: ghostFormUrl(user.value?.category, 'on_market', user.value?._id, user.value?.company_hashed, user.value?.email_hashed, user.value?.calendar_link),
        data_home: home
    },
    {
        id: 'house-on-market',
        label: 'House On Market Portal',
        description: 'Value-driven consumer landing wrapper. Incentivizes lead conversions via digital disclosures, pricing assets, and private tour links.',
        badge: 'Public Funnel',
        badgeClass: 'bg-[#B5563A]/10 text-[#B5563A] border-[#B5563A]/30',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        form_url: ghostFormUrl(user.value?.category, 'on_market', user.value?._id, user.value?.company_hashed, user.value?.email_hashed, user.value?.calendar_link),
        data_home: home
    }
]);
</script>

<template>
    <div>
        <div class="max-w-4xl mx-auto space-y-8">

            <header
                class="border-b border-[#DDD6C9]/60 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <appHeader label="Forms" subLabel="Form Selection" />
                <baseButtonNavigate text="+ Create Lead" path="/dashboard/leads/create" />
            </header>

            <div class="space-y-5">
                <div v-for="item in formFunnels" :key="item.id"
                    class="relative overflow-hidden bg-[#EFEAE0] border border-[#DDD6C9]/80 hover:border-[#DDD6C9]/80 p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 group hover:shadow-2xl">
                    <baseCardForm :label="item.label" :description="item.description" :icon="item.icon"
                        :badge="item.badge" :badgeClass="item.badgeClass" :qr_code_url="item.form_url" :data="item.data_home" />
                </div>

            </div>
        </div>
    </div>
</template>