<script setup lang="ts">
await useFetch('/api/user', { key: 'user', lazy: true });
await useFetch('/api/leads', { key: 'leads', lazy: true });
await useFetch('/api/leads/status', { key: 'status', lazy: true });

const { data: user } = useNuxtData('user');

const authenticated = computed(() => {
    if (user) return true;
    else {
        return navigateTo(`/login`);
    }
});
</script>

<template>
  <main class="bg-[#020203] text-zinc-100 selection:bg-cyan-500/30 font-sans">
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
    </div>
        <template v-if="authenticated">
            <baseNavigationAuth />
            <slot />
        </template>

        <template v-else>
            <appAccess />
        </template>

    </main>
</template>