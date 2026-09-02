<script setup lang="ts">
definePageMeta({ layout: 'authenticated' });

useHead({
  title: 'GhostForm | Properties',
  meta: [{ name: 'description', content: 'The listings you can attach to a capture form.' }],
});

const { data: homes, refresh } = await useFetch<any[]>('/api/homes', { key: 'homes', lazy: true });

const toast = useToast();
const search = ref('');
const statusFilter = ref<'all' | 'active' | 'pending' | 'sold'>('all');
const busyId = ref<string | null>(null);


const list = computed(() => homes.value ?? []);

const filtered = computed(() =>
  list.value.filter((h: any) => {
    const hay = `${h.name ?? ''} ${h.address ?? ''} ${h.owner ?? ''}`.toLowerCase();
    const matchesSearch = hay.includes(search.value.toLowerCase().trim());
    const status = h.status || 'active';
    const matchesStatus = statusFilter.value === 'all' || status === statusFilter.value;
    return matchesSearch && matchesStatus;
  })
);

const activeCount = computed(() =>
  list.value.filter((h: any) => (h.status || 'active') === 'active').length
);

const STATUS_LABEL: Record<string, string> = {
  active: 'Active', pending: 'Pending', sold: 'Sold'
};

async function setStatus(home: any, status: string) {
  busyId.value = home._id;
  try {
    await $fetch('/api/homes/update', {
      method: 'POST',
      body: { _id: home._id, address: home.address, name: home.name, owner: home.owner, notes: home.notes, status }
    });
    await refresh();
    await refreshNuxtData('homes');
  } catch {
    toast.error('Could not update that property.');
  } finally {
    busyId.value = null;
  }
}

async function remove(home: any) {
  if (!confirm(`Remove ${home.name || home.address}? This won't affect leads already captured for it.`)) return;
  busyId.value = home._id;
  try {
    await $fetch('/api/homes/delete', { method: 'POST', body: { _id: home._id } });
    await refresh();
    await refreshNuxtData('homes');
    toast.success('Property removed.');
  } catch {
    toast.error('Could not remove that property.');
  } finally {
    busyId.value = null;
  }
}
</script>

<template>
  <div class="max-w-[1100px] mx-auto">

    <!-- Head -->
    <header class="mb-16 pt-4">
      <p class="h-label mb-5 gf-rise" style="--d:.05s">Properties</p>

      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="--d:.12s">
            The listings you're working.
          </h1>
          <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[50ch] gf-rise" style="--d:.2s">
            <template v-if="list.length">
              {{ activeCount }} active. Add one here and it appears in the property
              picker on your forms, so every lead is tagged to the right listing.
            </template>
            <template v-else>
              Add a listing here and you'll be able to attach it to an open house
              QR code — so you know which property each lead came from.
            </template>
          </p>
        </div>

        <div class="gf-rise shrink-0" style="--d:.28s">
          <baseButtonNavigate text="+ Add a property" path="/dashboard/home/create" />
        </div>
      </div>
    </header>

    <!-- Filters -->
    <section v-if="list.length" class="gf-depth mb-10">
      <div class="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <input
          v-model="search"
          placeholder="Search by address, nickname or owner…"
          class="w-full sm:max-w-xs bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#4C5741] transition-colors"
        />

        <div class="flex gap-2">
          <button
            v-for="s in (['all','active','pending','sold'] as const)"
            :key="s"
            class="px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] border transition-colors"
            :class="statusFilter === s
              ? 'bg-[#4C5741]/10 border-[#4C5741] text-[#4C5741]'
              : 'border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
            @click="statusFilter = s"
          >
            {{ s === 'all' ? 'All' : STATUS_LABEL[s] }}
          </button>
        </div>
      </div>
    </section>

    <!-- List -->
    <section class="gf-depth">
      <div v-if="filtered.length">
        <div
          v-for="home in filtered"
          :key="home._id"
          class="gf-home-row group border-t border-[#DDD6C9] last:border-b py-7"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-baseline gap-3 mb-1.5">
              <NuxtLink
                :to="`/dashboard/home/${home._id}`"
                class="font-display text-[21px] font-semibold tracking-tight hover:text-[#4C5741] transition-colors"
              >
                {{ home.name || home.address }}
              </NuxtLink>
              <span
                class="text-[10.5px] uppercase tracking-[0.14em]"
                :class="(home.status || 'active') === 'sold' ? 'text-[#A9A39A]' : 'text-[#5A6349]'"
              >
                {{ STATUS_LABEL[home.status || 'active'] }}
              </span>
            </div>

            <p v-if="home.name" class="text-[14px] text-[#8A847C]">{{ home.address }}</p>
            <p v-if="home.owner" class="text-[13px] text-[#A9A39A] mt-1">Owner: {{ home.owner }}</p>
            <p v-if="home.notes" class="text-[13.5px] text-[#8A847C] mt-2.5 leading-relaxed max-w-[60ch]">
              {{ home.notes }}
            </p>
          </div>

          <div class="gf-home-actions flex flex-wrap gap-2.5">
            <select
              :value="home.status || 'active'"
              :disabled="busyId === home._id"
              class="flex-1 sm:flex-initial bg-[#F7F4EF] border border-[#DDD6C9] px-3 py-2.5 text-[11px] uppercase tracking-[0.1em] text-[#8A847C] focus:outline-none focus:border-[#4C5741] disabled:opacity-40"
              @change="setStatus(home, ($event.target as HTMLSelectElement).value)"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>


            <NuxtLink
              :to="`/dashboard/home/${home._id}`"
              class="flex-1 sm:flex-initial text-center px-4 py-2.5 border border-[#B5563A] text-[#B5563A] text-[11px] uppercase tracking-[0.1em] hover:bg-[#1F1B16] hover:text-[#F7F4EF] transition-colors whitespace-nowrap"
            >
              Open
            </NuxtLink>

            <button
              :disabled="busyId === home._id"
              class="px-4 py-2.5 border border-[#DDD6C9] text-[#A9A39A] text-[11px] uppercase tracking-[0.1em] hover:border-[#4C5741] hover:text-[#4C5741] transition-colors disabled:opacity-40 whitespace-nowrap"
              @click="remove(home)"
            >
              Remove
            </button>
          </div>

        </div>
      </div>

      <!-- Nothing matches the filter -->
      <div v-else-if="list.length" class="border-t border-b border-[#DDD6C9] py-14 text-center">
        <p class="text-[14px] text-[#8A847C]">Nothing matches that search.</p>
      </div>

      <!-- No properties at all -->
      <div v-else class="border-t border-b border-[#DDD6C9] py-16 text-center">
        <p class="text-[14px] text-[#8A847C] mb-6 max-w-[44ch] mx-auto leading-relaxed">
          No properties yet. You don't need one to collect leads — but adding a
          listing lets you tag each lead to the house they walked through.
        </p>
        <baseButtonNavigate text="+ Add your first property" path="/dashboard/home/create" />
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Mobile: content stacked above a full-width action row.
   The previous inline `grid-template-columns: 1fr auto` had no breakpoint, so
   on a phone the action column took most of the width and squeezed the address
   into one word per line. */
.gf-home-row {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.gf-home-actions { width: 100%; }

@media (min-width: 640px) {
  .gf-home-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 1.5rem;
  }
  .gf-home-actions { width: auto; justify-content: flex-end; }
}
</style>
