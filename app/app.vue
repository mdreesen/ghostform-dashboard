<script setup>
useSeoMeta({
  title: 'GhostForm | The High-Performance Multi-Step Form Engine',
  ogTitle: 'GhostForm | Capture Leads Like a Ghost in the Machine',
  description: 'Stop losing leads to "File Too Large" errors. GhostForm shrinks massive 10MB phone uploads into lightweight, high-quality images instantly.',
  ogDescription: 'Automated image compression, Resend integration, and ultra-fast multi-step flows for Nuxt 4.',
  ogImage: '/og-image.png', // Create a 1200x630 image of your new logo
  twitterCard: 'summary_large_image',
  twitterTitle: 'GhostForm - Stop the 413 Payload Error',
  twitterDescription: 'Client-side image compression that saves your server and doubles your conversion rate.',
  themeColor: '#020203', // Matches your deep black background
})
</script>
<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>