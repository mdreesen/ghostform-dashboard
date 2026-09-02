<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { Lead } from '~/types/lead';

const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');

const props = defineProps({
  data: {
    type: Array<Lead>,
    default: () => [],
    required: true
  },
});

const toast = useToast();
// Track leads mid-request so their button can show a saving state.
const marking = ref<Set<string>>(new Set());

/**
 * Turn a lead's last-contact timestamp into a short human label, matching the
 * Daily Briefing wording. Falls back through lastContactedAt -> updatedAt so
 * older leads still read sensibly.
 */
function lastContactLabel(lead: any): string {
  const raw = lead?.lastContactedAt;
  if (!raw) return 'Never';
  const days = Math.floor((Date.now() - new Date(raw).getTime()) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

/**
 * Mark a lead as contacted from the table. Same endpoint the briefing uses;
 * refreshes the shared caches so both the table and the briefing update.
 */
async function markContacted(lead: any) {
  if (!lead?._id || marking.value.has(lead._id)) return;
  marking.value.add(lead._id);
  try {
    await $fetch(`/api/leads/${lead._id}/contacted`, { method: 'POST' });
    toast.success(`Marked ${lead.name || 'lead'} as contacted`);
    await Promise.all([refreshNuxtData('leads'), refreshNuxtData('briefing')]);
  } catch {
    toast.error('Could not update. Please try again.');
  } finally {
    marking.value.delete(lead._id);
  }
}

const columns: TableColumn<Lead>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        new: 'info' as const,
        archived: 'neutral' as const,
        active: 'success' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'want_to_move',
    header: 'Looking to move',
  },
  {
    accessorKey: 'buy_sell_both',
    header: 'Buy, Sell, or Both',
  },
  {
    accessorKey: 'price',
    header: 'Estimated home price',
  },
  {
    accessorKey: 'sqft',
    header: 'Sqft',
  },
  {
    accessorKey: 'bedrooms',
    header: 'Bedrooms',
  },
  {
    accessorKey: 'bathrooms',
    header: 'Bathrooms',
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
  },
  {
    id: 'last_contact',
    header: 'Last contact',
    cell: ({ row }) => {
      const label = lastContactLabel(row.original)
      return h(
        'span',
        { class: label === 'Never' ? 'text-[#8A847C]' : 'text-[#1F1B16]' },
        label
      )
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const lead = row.original as any
      const busy = marking.value.has(lead?._id)
      return h(
        UButton,
        {
          size: 'xs',
          color: 'primary',
          variant: 'subtle',
          loading: busy,
          disabled: busy,
          onClick: () => markContacted(lead)
        },
        () => (busy ? 'Saving…' : '✓ Contacted')
      )
    }
  },
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'email',
    value: ''
  }
]);

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
</script>

<template>
  <div class="border border-[#DDD6C9] bg-[#F7F4EF] overflow-hidden w-full">
    <div class="flex flex-col flex-1 w-full p-5">
      <div class="flex px-4 py-3.5 border-b border-[#DDD6C9]">
        <UInput :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string" class="max-w-sm"
          placeholder="Filter emails..."
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)" />
      </div>
      <!-- Nuxt UI's defaults assume a dark surface — headers came out white on
           cream and were invisible. Every slot is themed explicitly. -->
      <UTable ref="table" v-model:pagination="pagination" v-model:column-filters="columnFilters" :data="data"
        :columns="columns" :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }" class="flex-1"
        :ui="{
          base: 'min-w-full',
          thead: 'border-b border-[#DDD6C9]',
          tbody: 'divide-y divide-[#DDD6C9]',
          th: 'text-left px-4 py-3 text-[11px] uppercase tracking-[0.12em] font-semibold text-[#6B655C]',
          td: 'px-4 py-4 text-[14.5px] text-[#1F1B16]',
          tr: 'hover:bg-[#EFEAE0]/60 transition-colors'
        }">
        <template #name-cell="{ row }">
          <NuxtLink :to="`/dashboard/leads/${row.original?._id}/details`"
            class="text-[#1F1B16] hover:text-[#4C5741] underline underline-offset-2 decoration-[#C7BFAF] hover:decoration-[#4C5741] font-medium transition-colors">
            {{ row.original?.name ? row.original?.name : 'Not Specified' }}
          </NuxtLink>
        </template>

        <template #email-cell="{ row }">
          <baseMessage :label="row.original?.email" message_type="mailto" :communication_type="row.original?.email" />
        </template>

        <template #phone-cell="{ row }">
          <baseMessage :label="row.original?.phone.toString()" message_type="sms" communication_type="sms" />
        </template>

        <template #address-cell="{ row }">
          <baseMaps :address="row.original?.address" />
        </template>
      </UTable>

      <div class="flex justify-end border-t border-[#DDD6C9] pt-4 px-4">
        <UPagination :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
          :ui="{
            list: 'flex items-center gap-1',
            label: 'text-[13px]'
          }"
          :active-color="'neutral'" :color="'neutral'" :variant="'outline'" />
      </div>
    </div>
  </div>
</template>
