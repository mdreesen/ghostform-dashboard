<script setup lang="ts">
import { ghostFormUrl } from '~/utils/ghostFormUrl';

definePageMeta({
    layout: 'authenticated',
});

const { data: user } = useNuxtData('user');
const { data: home } = useNuxtData('homes');

</script>

<template>
    <div>
        <section class="flex flex-wrap justify-between">
            <appHeader label="Forms" subLabel="Form Selection" />
            <baseButtonNavigate text="+ Home" path="/dashboard/home/create" />
        </section>

        <div>
            <baseHeaderSection text="Select available forms" />

            <section class="flex flex-wrap justify-between gap-6">
                <baseCardForm label="Data Entry"
                    :qr_code_url="ghostFormUrl(user?.category, 'default', user?._id, user?.company_hashed, user?.email_hashed, user?.calendar_link)" />

                <baseCardForm label="Open House"
                    :qr_code_url="ghostFormUrl(user?.category, 'open_house', user?._id, user?.company_hashed, user?.email_hashed, user?.calendar_link)"
                    :data="home" />

                <baseCardForm label="House On Market"
                    :qr_code_url="ghostFormUrl(user?.category, 'on_market', user?._id, user?.company_hashed, user?.email_hashed, user?.calendar_link)"
                    :data="home" />
            </section>
        </div>
    </div>
</template>