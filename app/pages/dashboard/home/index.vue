<script setup lang="ts">

definePageMeta({
    layout: 'authenticated',
});

const { data: home } = useNuxtData('homes');
console.log()
</script>

<template>
    <div>
        <section class="flex flex-wrap justify-between">
            <appHeader label="Homes" subLabel="Home Selection" />
            <baseButtonNavigate text="+ Home" path="/dashboard/home/create" />
        </section>

        <div>
            <baseHeaderSection text="Select available homes" />

            <section class="flex flex-wrap justify-between gap-6">
                <template v-for="item in home">
                    <baseCardDetail :label="item.name ?? item?.address" :value="item.owner" />
                </template>
            </section>
        </div>
    </div>
</template>