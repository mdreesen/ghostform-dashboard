<script setup lang="ts">
const props = defineProps({
    category: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <div class="relative group max-w-md mx-auto">
  
      <div
        class="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt">
      </div>
  
      <div class="relative bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden border border-white/10">
  
        <div class="absolute inset-0 pointer-events-none opacity-20">
          <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[80px] animate-pulse">
          </div>
          <div
            class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[80px] animate-pulse"
            style="animation-delay: 1s;"></div>
        </div>

        <div v-if="!category && !company && !email">
            <baseHeaderBase class="py-8 flex content-center justify-center" text="The category, company name, and email are needed." />
        </div>
  
        <iframe
            v-else
            :src="`https://ghostform-zeta.vercel.app/?category=${props.category}&company_name=${props.company}&company_email=${props.email}&background_color=0f0b0b&font_color=FFFFFF`"
            style="width: 100%; height: 500px; border: none; background: transparent; border-radius: 20px;"
            allowtransparency="true" scrolling="no" />
  
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Custom Tilt Animation for the Glow */
  @keyframes tilt {
  
    0%,
    50%,
    100% {
      transform: rotate(0deg);
    }
  
    25% {
      transform: rotate(0.5deg);
    }
  
    75% {
      transform: rotate(-0.5deg);
    }
  }
  
  .animate-tilt {
    animation: tilt 10s infinite linear;
  }
  
  /* Ensure the iframe background doesn't override our mesh */
  iframe {
    background: transparent !important;
  }
  </style>