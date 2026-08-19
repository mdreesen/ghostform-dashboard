<script setup lang="ts">

const props = defineProps({
  stripe: {
    type: Boolean,
    default: false
  }
});

const { data: user } = useNuxtData('user');

const tiers = [
  {
    name: 'Shadow',
    price: '25',
    description: 'Light, entry-level, perfect for the solo agent just starting with QR capture.',
    features: ['Unlimited leads', 'Advanced 90% Compression', 'Custom Branding', 'Conditional Logic', 'Priority Email Support'],
    cta: 'Get Started',
    color: "#B5563A",
    stripe: `https://buy.stripe.com/9B6fZj0fNazkerT6dZ3wQ00?client_reference_id=${user.value?._id}`,
    highlighted: true
  },

  {
    name: 'Phantom',
    price: '50',
    description: 'Powerful, ever-present, the "standard" for high-volume producers.',
    features: ['Unlimited leads', 'Advanced 90% Compression', 'Custom Branding', 'Conditional Logic', 'Priority Email Support'],
    cta: 'Get Started',
    color: "#5A6349",
    stripe: `https://buy.stripe.com/7sY5kFe6Dazk5Vn7i33wQ01?client_reference_id=${user.value?._id}`,
    highlighted: false
  },
];
</script>

<template>
  <section id="pricing">
    <div class="max-w-4xl mx-auto text-center mb-20 reveal">
      <baseHeaderBase text="Choose your level of presence." />
      <p class="text-[#8A847C] text-lg">No hidden fees. Just weightless data and spectral speed.</p>
    </div>

    <div class="max-w-4xl mx-auto flex flex-wrap gap-8 items-center justify-center">
      <div v-for="tier in tiers" :key="tier.name" :class="[ 'relative p-8 transition-all duration-500 border reveal max-w-sm', tier.highlighted ? 'bg-[#F7F4EF] border-[#B5563A] scale-105 z-10' : 'bg-[#EFEAE0] border-[#DDD6C9] hover:border-[#A9A39A]' ]">
        <div v-if="tier.highlighted"
          class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#B5563A] text-[#F7F4EF] text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full">
          Most Popular
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-bold mb-2">{{ tier.name }}</h3>
          <div class="flex items-baseline gap-1">
            <span class="text-4xl font-semibold tracking-tight">$</span>
            <span class="text-6xl font-semibold tracking-tight">{{ tier.price }}</span>
            <span class="text-[#8A847C] text-sm">/mo</span>
          </div>
          <p class="mt-4 text-[#8A847C] text-sm leading-relaxed">{{ tier.description }}</p>
        </div>

        <ul class="space-y-4 mb-10">
          <li v-for="feature in tier.features" :key="feature" class="flex items-center gap-3 text-sm text-[#1F1B16]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              :stroke="tier.highlighted ? '#22d3ee' : '#52525b'" stroke-width="3" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {{ feature }}
          </li>
        </ul>

        <nuxtLink v-if="stripe" :to="tier.stripe">
          <button :class="[ 'w-full py-4 font-semibold transition-all transform active:scale-95', tier.highlighted ? 'bg-[#B5563A] text-[#F7F4EF] hover:bg-[#B5563A] ' : 'bg-[#EFEAE0] text-[#1F1B16] hover:bg-[#DDD6C9] border border-[#DDD6C9]' ]">
            {{ tier.cta }}
          </button>
        </nuxtLink>


        <nuxt-link v-else to="/signup">
          <button :class="[ 'w-full py-4 font-semibold transition-all transform active:scale-95', tier.highlighted ? 'bg-[#B5563A] text-[#F7F4EF] hover:bg-[#B5563A] ' : 'bg-[#EFEAE0] text-[#1F1B16] hover:bg-[#DDD6C9] border border-[#DDD6C9]' ]">
            {{ tier.cta }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>