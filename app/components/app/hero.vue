<template>
    <section class="relative pt-40 pb-20 px-6">
        <div class="max-w-5xl mx-auto text-center">
            <div
                class="reveal inline-block mb-6 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                The Future of Lead Capture
            </div>
            <span class="relative z-10 animate-bounce-slow flex items-center">
                    <NuxtImg class="relative z-10 h-20 w-full object-contain drop-shadow-md"
                        :src="'/images/logo-icon.webp'" format="webp" preload loading="eager" fetch-priority="high" />
                </span>
            <h1 class="reveal text-6xl md:text-8xl font-black tracking-tight leading-tight mb-4">
                <span class="inline-flex items-center">
                    Ghost
                </span>
                <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Form</span>
            </h1>
            <h2 class="reveal text-4xl md:text-4xl font-black tracking-tighter leading-tight mb-8">
                <span>
                    Weightless data
                </span>
                <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Spectral speed.
                </span>
            </h2>
            <p class="reveal text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12"
                style="transition-delay: 200ms">
                The light-weight multi-step form engine.
            </p>
            <div class="reveal flex flex-col md:flex-row items-center justify-center gap-4"
                style="transition-delay: 400ms">
                <!-- <button
                    class="w-full md:w-auto px-10 py-5 bg-cyan-500 text-black font-black rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform">
                    Start Building
                </button> -->

                <baseButtonNavigate path="/demo" text="View Live Demo" />
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes bounce-slow {

    0%,
    100% {
        transform: translate(0%, 0);
    }

    50% {
        transform: translate(0%, -10px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
}
</style>