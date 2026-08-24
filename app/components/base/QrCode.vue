<script setup lang="ts">
const props = defineProps({
    value: {
        type: String,
        required: true
    }
});
</script>

<template>
      <Qrcode :value="value" />
</template>