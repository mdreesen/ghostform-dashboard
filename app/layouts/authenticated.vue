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
    <main class="bg-[#F7F4EF] text-[#1F1B16] selection:bg-[#4C5741]/15 min-h-screen">
        <template v-if="authenticated">
            <baseNavBar />

            <ClientOnly>
              <baseTour :auto="!user?.tour_completed" />
            </ClientOnly>

            <!-- nav-offset shifts content right of the sidebar above 1000px,
                 and is a no-op below it where the tab bar is used instead. -->
            <div class="nav-offset">
            <div class="gf-stage gf-shell">
                <slot />
            </div>
            </div>
        </template>

        <template v-else>
            <appAccess />
        </template>

      <!-- Persistent voice input, on every page -->

      <ClientOnly><appVoiceDock /></ClientOnly>

    </main>
</template>
