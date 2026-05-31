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
    color: '#F0F8FF'
  },
  'February': {
    name: 'February',
    color: '#B0E0E6'
  },
  'March': {
    name: 'March',
    color: '#4682B4'
  },
  'April': {
    name: 'April',
    color: '#98FB98'
  },
  'May': {
    name: 'May',
    color: '#3CB371'
  },
  'June': {
    name: 'June',
    color: '#FFF8DC'
  },
  'July': {
    name: 'July',
    color: '#FFD700'
  },
  'August': {
    name: 'August',
    color: '#FFA500'
  },
  'September': {
    name: 'September',
    color: '#FFA500'
  },
  'October': {
    name: 'October',
    color: '#D2691E'
  },
  'November': {
    name: 'November',
    color: '#8B4513'
  },
  'December': {
    name: 'December',
    color: '#5C4033'
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