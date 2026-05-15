<script setup lang="ts">
const route = useRoute();

useHead({
  meta: [{ property: 'og:title', content: `Ascend - ${route.meta.title}` }],
});
</script>

<template>
  <main class="bg-[#020203] text-zinc-100 selection:bg-cyan-500/30 font-sans">
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
    </div>

    <baseNavigationBase />

    <div>
      <slot />
    </div>

    <baseFooter />
  </main>
</template>