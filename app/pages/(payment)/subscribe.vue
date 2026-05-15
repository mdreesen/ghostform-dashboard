<script setup lang="ts">
definePageMeta({
  layout: 'authenticated',
});

useHead({
  title: 'GhostForm | Subscribe',
  meta: [
    { name: 'Subscribe', content: 'GhostForm Subscribe' },
  ],
});

</script>

<template>
    <div>
        <appPricing stripe />
    </div>
</template>