<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { name: 'Overview', href: '/dashboard', target: "" },
  { name: 'Leads', href: '/dashboard/leads', target: "" },
  { name: 'GhostForm', href: '/dashboard/form', target: "_blank" },
  { name: 'Profile', href: '/dashboard/profile', target: "" },
]
</script>

<template>
  <nav :class="[
    'fixed top-0 w-full z-100 transition-all duration-300 border-b',
    isScrolled
      ? 'bg-black/60 backdrop-blur-xl border-white/10 py-3'
      : 'bg-transparent border-transparent py-5'
  ]">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <NuxtLink to="/dashboard" class="flex items-center gap-3 group">
        <div class="relative w-10 h-10 flex items-center justify-center">
          <div class="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/40 transition-all">
          </div>
          <NuxtImg class="relative z-10 h-20 w-full object-contain drop-shadow-md" :src="'/images/logo-icon.webp'" format="webp"
          preload loading="eager" fetch-priority="high" />
        </div>
        <span class="text-xl font-black tracking-tighter text-white">GhostForm</span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-8">
        <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.href" :target="link.target"
          class="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">
          {{ link.name }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">

        <button @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden text-zinc-400 hover:text-white transition-colors">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
      <div v-if="isMobileMenuOpen"
        class="absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl">
        <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.href" @click="isMobileMenuOpen = false"
          class="text-lg font-bold text-zinc-300 hover:text-cyan-400">
          {{ link.name }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>