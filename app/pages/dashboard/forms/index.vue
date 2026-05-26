<script setup lang="ts">
import { ghostFormUrl } from '~/utils/ghostFormUrl';

definePageMeta({
    layout: 'authenticated',
});

const { data: user } = useNuxtData('user');

</script>

<template>
    <div>
        <appHeader label="Forms" subLabel="Form Selection" />

        <div>
            <baseHeaderSection text="Form Selections" />

            <section class="flex flex-wrap justify-between gap-6">
                <baseCardForm label="Data Entry"
                    :qr_code_url="ghostFormUrl(user?.category, 'default', user?.company_hashed, user?.email_hashed, user?.calendar_link)" />

                <baseCardForm label="Open House"
                    :qr_code_url="ghostFormUrl(user?.category, 'open_house', user?.company_hashed, user?.email_hashed, user?.calendar_link)" />

                <baseCardForm label="House On Market"
                    :qr_code_url="ghostFormUrl(user?.category, 'on_market', user?.company_hashed, user?.email_hashed, user?.calendar_link)" />
            </section>
        </div>
    </div>
</template>

<style scoped>
@keyframes bounce-slow {

    0%,
    100% {
        transform: translate(-50%, 0);
    }

    50% {
        transform: translate(-50%, -10px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
}
</style>