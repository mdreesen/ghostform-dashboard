<script setup lang="ts">
const features = [
    {
        title: 'Image Compression',
        desc: 'Stop crashing your server. Our engine shrinks 10MB mobile photos into 400KB specters instantly in the browser.',
        icon: 'line-md:image'
    },
    {
        title: 'Vanishing Logic',
        desc: 'Smart multi-step flows that adapt to user answers. One question at a time. Zero friction.',
        icon: 'line-md:briefcase'
    },
    {
        title: 'Direct Inbox',
        desc: 'No database middleman. Leads transfer to your inbox instantly via Resend with high-res attachments.',
        icon: 'line-md:email'
    },
    {
        title: "Metadata Extraction",
        desc: "Automatically strip hidden GPS and camera bloat from images to protect user privacy and save space.",
        icon: 'line-md:cog-loop'
    },
    {
        title: 'Auto-Confirmation Echo',
        desc: 'Send a beautiful, automated "Success" email back to the customer the moment they finish.',
        icon: 'line-md:person'
    },
    {
        title: 'Smart-Crop Preview',
        desc: 'Give users an instant thumbnail preview of their uploads before they hit submit.',
        icon: 'line-md:cloud-alt-tags-loop'
    }
];
</script>

<template>
    <section id="features" class="py-32 px-6 max-w-7xl mx-auto">
        <baseHeaderBase text="Features" />
        <div class="grid md:grid-cols-3 gap-8">
            <div v-for="(f, i) in features" :key="f.title"
                class="reveal p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-cyan-500/30 transition-all group"
                :style="{ transitionDelay: `${i * 150}ms` }">
                <baseIcon class="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600" :iconName="f.icon" />
                <h3 class="text-2xl font-bold mb-4">{{ f.title }}</h3>
                <p class="text-zinc-400 leading-relaxed">{{ f.desc }}</p>
            </div>
        </div>
    </section>
</template>