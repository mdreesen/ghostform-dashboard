<script setup lang="ts">
await useFetch('/api/user', { key: 'get_user', lazy: true });
</script>

<template>
    <main>
        <slot />
    </main>
</template>