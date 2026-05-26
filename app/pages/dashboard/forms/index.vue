<script setup lang="ts">
definePageMeta({
    layout: 'authenticated',
});

const { data: user } = useNuxtData('get_user');

</script>

<template>
  <div class="min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden">

        <section class="flex flex-wrap justify-between gap-6 mb-12">

            <div>
                <baseCardForm label="Data Entry" />
            </div>

            <div>
                <baseCardForm label="Open House" />
            </div>

            <div>
                <baseCardForm label="House Details" />
            </div>
      </section>
    </div>
</template>

<style scoped>
@keyframes bounce-slow {

    0%,
    100% {
        transform: translate(-50%, 0);
    }

    50% {
        transform: translate(-50%, -10px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
}
</style>