<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useCSV } from '~/utils/csv';
import { useSpreadsheet } from '~/utils/spreadsheet';

const props = defineProps({
    data: {
        type: Array<any>,
        required: true
    }
})

const isExporting = ref(false);
const currentFormat = ref('XLSX');

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Formatted Spreadsheet (.xlsx)',
      icon: 'i-heroicons-table-cells',
      onSelect: () => {
        currentFormat.value = 'XLSX'
        executeExport()
      }
    },
    {
      label: 'Raw Comma Separated (.csv)',
      icon: 'i-heroicons-document-text',
      onSelect: () => {
        currentFormat.value = 'CSV'
        executeExport()
      }
    }
  ]
])

// File pipeline router synchronization function
const executeExport = async () => {
    const { exportLeadsToXLSX, isGenerating } = useSpreadsheet()
  isExporting.value = true
  try {
    switch(true) {
        case currentFormat.value.includes('CSV'):
            return useCSV(props.data);
        default:
            return exportLeadsToXLSX(props.data, 'hello');

    };
  } catch (error) {
    console.error('Data pipeline extraction phase aborted.')
  } finally {
    setTimeout(() => {
      isExporting.value = false
    }, 1000)
  }
}
</script>

<template>
  <div class="inline-flex items-center rounded-xl overflow-hidden shadow-[0_0_20px_rgba(48,207,67,0.1)] bg-white/2 border border-white/8">
    
    <UButton
      :loading="isExporting"
      color="neutral"
      variant="ghost"
      icon="i-heroicons-arrow-down-tray"
      class="rounded-none px-4 py-2.5 text-xs font-black tracking-wider uppercase text-white hover:bg-cyan/10"
      @click="executeExport"
    >
      Export {{ currentFormat }}
    </UButton>

    <UDropdownMenu 
      :items="items"
      :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-heroicons-chevron-down"
        class="rounded-none border-l border-white/8 px-2.5 py-2.5 text-white hover:bg-cyan/10"
      />
    </UDropdownMenu>

  </div>
</template>