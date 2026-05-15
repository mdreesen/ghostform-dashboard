<script setup lang="ts">
const data = [
    {
        icon: 'x',
        title: "Traditional Forms",
        desc: 'Break on 12MB photos, boring UI, 20% conversion rate, requires database management.'
    },
    {
        icon: '✓',
        title: "GhostForm",
        desc: 'Auto-compressing tech, adaptive multi-step flow, 65% conversion rate, inbox delivery via Resend.'
    },

    {
        icon: 'x',
        title: "Traditional Image Sending",
        desc: 'Most standard web servers have a "Maximum Payload Size." If a user tries to upload three 8MB photos from their mobile devices, the server simply hangs or crashes with a 413 Request Entity Too Large error.'
    },
    {
        icon: '✓',
        title: "GhostForm Image Sending",
        desc: "By shrinking those 24MB of photos down to 1.5MB before they are sent, we bypass the server's limit entirely. We 'plug the leak' by ensuring the door is always wide enough for their data."
    },

    {
        icon: 'x',
        title: "Traditional Form Questions",
        desc: 'Standard forms show all 15 questions at once. It looks like a tax document.'
    },
    {
        icon: '✓',
        title: "GhostForm Questions",
        desc: "Our 'Spectral Speed' multi-step flow feels like a text message conversation. It’s low-friction, high-engagement."
    },
]
</script>

<template>
    <div class="py-32 px-6 bg-cyan-500/5">
        <div class="max-w-4xl mx-auto bg-zinc-950 border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl reveal">
            <h2 class="text-4xl font-black mb-12 text-center">Stop the Leak.</h2>
            <div class="space-y-8">
                <div v-for="(item, index) in data" :key="index">
                    <div :class="`${index % 2 && index !== data.length - 1 && 'border-b-4 border-white/10 border-solid pb-7.5'} flex items-start gap-6`">
                        <div
                            :class="`w-8 h-8 rounded-full ${item.icon.includes('x') ? 'bg-red-500/20 text-red-500' : 'bg-cyan-500/20 text-cyan-500'} shrink-0 flex items-center justify-center font-bold`">
                            {{ item.icon }}</div>
                        <div>
                            <h4 class="font-bold text-lg">{{ item.title }}</h4>
                            <p class="text-zinc-500">{{ item.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>