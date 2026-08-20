<script setup lang="ts">
await useFetch('/api/user', { key: 'user', lazy: true });
await useFetch('/api/leads', { key: 'leads', lazy: true });
await useFetch('/api/charts/lead', { key: 'charts_lead', lazy: true });
await useFetch('/api/campaigns', { key: 'campaigns', lazy: true });
await useFetch('/api/homes', { key: 'homes', lazy: true });
await useFetch('/api/briefing', { key: 'briefing', lazy: true });

const { data: user } = useNuxtData('user');

const authenticated = computed(() => user ? true : navigateTo(`/login`));
</script>

<template>
    <main class="bg-[#F7F4EF] text-[#1F1B16] selection:bg-[#B5563A]/15 min-h-screen">
        <template v-if="authenticated">
            <baseNavBar />

            <ClientOnly>
              <baseTour :auto="!user?.tour_completed" />
            </ClientOnly>

            <div class="gf-stage pt-24 pb-28 px-6 sm:px-10 lg:px-12">
                <slot />
            </div>
        </template>

        <template v-else>
            <appAccess />
        </template>
    </main>
</template>
