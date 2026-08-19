<script setup lang="ts">
defineOptions({
  tags: ['donutcharts', 'withlegend']
});

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
});

let donutData = ref([]);
let monthData = ref({})

const marketShareLabels = {
  'January': {
    name: 'January',
    color: '#B5563A'
  },
  'February': {
    name: 'February',
    color: '#C4694A'
  },
  'March': {
    name: 'March',
    color: '#C9866F'
  },
  'April': {
    name: 'April',
    color: '#D2A08A'
  },
  'May': {
    name: 'May',
    color: '#A9906F'
  },
  'June': {
    name: 'June',
    color: '#8C8A62'
  },
  'July': {
    name: 'July',
    color: '#6F7B54'
  },
  'August': {
    name: 'August',
    color: '#5A6349'
  },
  'September': {
    name: 'September',
    color: '#7A7268'
  },
  'October': {
    name: 'October',
    color: '#A9A39A'
  },
  'November': {
    name: 'November',
    color: '#C6BFB2'
  },
  'December': {
    name: 'December',
    color: '#DDD6C9'
  }
};

props.data.map((item) => {
    donutData.value.push(item?.count);
    monthData.value[item?.month] = { ...marketShareLabels[item?.month] };
});

</script>

<template>
  <DonutChart
    :data="donutData"
    :categories="monthData"
    :height="200"
    :radius="80"
    :pad-angle="0.1"
    :arc-width="20"
  >
    <div class="text-center">
      <div class="font-semibold">
        Leads per month
      </div>
    </div>
  </DonutChart>
</template>