<script setup lang="ts">
</script>

<template>
    <main class="bg-[#080B11] text-slate-100 selection:bg-cyan-500/30 font-sans min-h-screen relative overflow-hidden">
        <div class="fixed inset-0 pointer-events-none">
            <div class="absolute top-0 right-0 w-150 h-150 bg-cyan-400 rounded-full blur-[200px] opacity-[0.03]"></div>
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
            <div class="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        </div>

        <main class="py-20 p-6 lg:py-18 relative z-10">
            <slot />
        </main>
    </main>
</template>
