<script setup lang="ts">
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
})

const data = computed(() => props.data);

const categories = {
  count: {
    name: 'Count',
    color: '#00d3f3',
  },
}

const xFormatter = (i: number) => data.value[i]?.month;
</script>

<template>
  <LineChart
    :data="data"
    :categories="categories"
    :height="300"
    :xFormatter="xFormatter"
    xLabel="Month"
    yLabel="Leads"
  />
</template>