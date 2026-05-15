<script setup lang="ts">

const props = defineProps({
    stripe: {
        type: Boolean,
        default: false
    }
});

const tiers = [
  {
    name: 'Shadow',
    price: '49',
    description: 'Light, entry-level, perfect for the solo agent just starting with QR capture.',
    features: ['Unlimited leads', 'Advanced 90% Compression', 'Custom Branding', 'Conditional Logic', 'Priority Email Support'],
    cta: 'Get Started',
    color: "cyan-500",
    stripe: 'price_1TW2I0Bww0ljz1NXrIJdf4r0',
    highlighted: true
  },

  {
    name: 'Phantom',
    price: '99',
    description: 'Powerful, ever-present, the "standard" for high-volume producers.',
    features: ['Unlimited leads', 'Advanced 90% Compression', 'Custom Branding', 'Conditional Logic', 'Priority Email Support'],
    cta: 'Get Started',
    color: "blue-500",
    stripe: 'price_1TW3reBww0ljz1NXA3mKGjlh',
    highlighted: false
  },
];

const { data: user } = useNuxtData('get_user');

const startSubscription = async (priceId: string) => {
  const { url } = await $fetch('/api/stripe/subscribe', {
    method: 'POST',
    body: { 
      priceId: priceId,
      id: user.value._id,
      email: user.value.email
     }
  })
  window.location.href = url // Redirect to Stripe
};
</script>

<template>
  <section id="pricing" class="py-32 px-6 relative overflow-hidden">
    <div class="max-w-4xl mx-auto text-center mb-20 reveal">
      <baseHeaderBase text="Choose your level of presence." />
      <p class="text-zinc-400 text-lg">No hidden fees. Just weightless data and spectral speed.</p>
    </div>

    <div class="max-w-4xl mx-auto flex flex-wrap gap-8 items-center justify-center">
      <div v-for="tier in tiers" :key="tier.name" :class="[
        'relative p-8 rounded-[2.5rem] transition-all duration-500 border reveal max-w-sm',
        tier.highlighted
          ? 'bg-zinc-900 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] scale-105 z-10'
          : 'bg-zinc-950/50 border-white hover:border-white/20'
      ]">
        <!-- <div v-if="tier.highlighted" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
          Most Popular
        </div> -->

        <div class="mb-8">
          <h3 class="text-xl font-bold mb-2">{{ tier.name }}</h3>
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-black tracking-tight">$</span>
            <span class="text-6xl font-black tracking-tight">{{ tier.price }}</span>
            <span class="text-zinc-500 text-sm">/mo</span>
          </div>
          <p class="mt-4 text-zinc-400 text-sm leading-relaxed">{{ tier.description }}</p>
        </div>

        <ul class="space-y-4 mb-10">
          <li v-for="feature in tier.features" :key="feature" class="flex items-center gap-3 text-sm text-zinc-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              :stroke="tier.highlighted ? '#22d3ee' : '#52525b'" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {{ feature }}
          </li>
        </ul>

        <button 
        v-if="stripe"
        @click="startSubscription(tier.stripe)"
        :class="[
            'w-full py-4 rounded-2xl font-black transition-all transform active:scale-95',
            tier.highlighted
              ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
          ]">
            {{ tier.cta }}
          </button>

        <nuxt-link v-else to="/signup">
          <button :class="[
            'w-full py-4 rounded-2xl font-black transition-all transform active:scale-95',
            tier.highlighted
              ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
          ]">
            {{ tier.cta }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>