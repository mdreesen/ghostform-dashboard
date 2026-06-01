<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
// import { useColorMode } from '#imports'; // This import works in Nuxt 3/4 setup scripts

// const colorMode = useColorMode();

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Overview',
  to: '/dashboard',
  // icon: 'i-lucide-book-open',
}, {
  label: 'Campaigns',
  to: '/dashboard/campaigns',
  // icon: 'mdi-light:account',
}, {
  label: 'Forms',
  // icon: 'i-simple-icons-figma',
  to: '/dashboard/forms',
}, {
  label: 'Leads',
  // icon: 'i-lucide-rocket',
  to: '/dashboard/leads',
}, {
  label: 'Profile',
  // icon: 'i-lucide-rocket',
  to: '/dashboard/profile',
}])
</script>

<template>
  <UHeader mode="slideover" class="border-none fixed w-full bg-transparent">
    <template #title>
      <!-- Logo/Brand Name -->
      <ClientOnly>
        <NuxtLink to="/dashboard" class="flex items-center gap-3 group">
          <div class="relative w-10 h-10 flex items-center justify-center">
            <div class="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/40 transition-all">
            </div>
            <NuxtImg class="relative z-10 h-20 w-full object-contain drop-shadow-md" :src="'/images/logo-icon.webp'"
              format="webp" preload loading="eager" fetch-priority="high" />
          </div>
          <span class="text-xl font-black tracking-tighter text-white">GhostForm</span>
        </NuxtLink>
      </ClientOnly>
    </template>

    <UNavigationMenu color="neutral" :items="items" />

    <template #body>
      <UNavigationMenu color="neutral" :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
