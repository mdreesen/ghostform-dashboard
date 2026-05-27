<script setup lang="ts">

const props = defineProps({
    leads: {
        type: Object,
        required: true,
        default: () => {}
    },
})

const leads_new = props.leads?.status.find((item) => item.label.includes('new'));
const leads_active = props.leads?.status.find((item) => item.label.includes('active'));

const cardData = computed(() => [
    { title: 'Total Intake', value: `${props.leads.all?.length ?? 0}` },
    { title: 'Active Leads', value: `${leads_active.leads.length ?? 0}` },
    { title: 'New Leads', value: `${leads_new.leads.length ?? 0}` }
]
);
</script>

<template>
        <template v-if="leads" v-for="data in cardData">
            <ClientOnly>
                <baseCardDetail :label="data.title" :value="data.value" />
            </ClientOnly>
        </template>
</template>