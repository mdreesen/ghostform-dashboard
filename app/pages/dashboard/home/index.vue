<script setup>
import { ref, computed, onMounted } from 'vue';

definePageMeta({
    layout: 'authenticated',
});

const { data: home } = useNuxtData('homes');

const homes = ref(home.value ?? [])
const isLoading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('all');


// --- 1. FETCH HOMES FROM MONGOOSE ON MOUNT ---
onMounted(async () => {
  try {
    const response = home.value;
    if (response && response.success) {
      homes.value = response.homes || response.data || []
    }
  } catch (err) {
    console.error('❌ Failed to pull realtor home listings:', err)
  } finally {
    isLoading.value = false
  }
})

// --- 2. LIVE SEARCH & FILTER COMPUTED PIPELINE ---
const filteredHomes = computed(() => {
  return homes.value.filter(home => {
    // Search match across Title, City, Zip, or Full Address strings
    const matchString = `${home.title} ${home.addressDetails?.fullAddress} ${home.addressDetails?.zipCode}`.toLowerCase()
    const matchesSearch = matchString.includes(searchQuery.value.toLowerCase())
    
    // Status filter breakdown match (Active, Pending, Sold)
    const matchesStatus = statusFilter.value === 'all' || home.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

// Quick helper to format pricing data with commas
function formatCurrency(value) {
  if (!value) return '$0'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <div>
    <div class="max-w-6xl mx-auto space-y-6">
      
      <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div class="space-y-0.5">
          <h1 class="text-xl font-black tracking-tight text-gray-900">Property Model Inventory</h1>
          <p class="text-xs text-gray-400 font-medium">Manage and refer to your standardized real estate models for dynamic content repurposing.</p>
        </div>
        <button 
          @click="$router.push('/realtor/inventory/create')"
          class="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all active:scale-[0.99] gap-2 self-start md:self-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Home
        </button>
      </header>

      <div class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 border border-gray-100 rounded-2xl shadow-xs">
        <div class="relative w-full sm:max-w-xs">
          <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search matching listings..." 
            class="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-100 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>

        <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div class="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100 text-[11px] font-bold">
            <button @click="statusFilter = 'all'" :class="statusFilter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-400'" class="px-2.5 py-1 rounded-lg transition-all">All</button>
            <button @click="statusFilter = 'active'" :class="statusFilter === 'active' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-400'" class="px-2.5 py-1 rounded-lg transition-all">Active</button>
            <button @click="statusFilter = 'sold'" :class="statusFilter === 'sold' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-400'" class="px-2.5 py-1 rounded-lg transition-all">Sold</button>
          </div>
          <span class="text-[10px] font-mono font-black uppercase text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg">
            Total: {{ filteredHomes.length }}
          </span>
        </div>
      </div>

      <div v-if="isLoading" class="py-32 text-center space-y-3">
        <div class="w-8 h-8 border-[3px] border-gray-100 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
        <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Hydrating property vault components...</p>
      </div>

      <div v-else-if="filteredHomes.length === 0" class="py-24 text-center border border-dashed border-gray-200 bg-white rounded-3xl space-y-4">
        <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v14.25A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5H5.25M10.5 6h3m-3 3h3m-3 3h3m-3 3h3M4.5 19.5h15" />
          </svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-xs font-black text-gray-700 uppercase tracking-wide">No Properties Found</h3>
          <p class="text-[11px] text-gray-400 max-w-70 mx-auto leading-normal">Adjust your lookup values or populate your array map with a brand-new inventory entry card.</p>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div 
          v-for="home in filteredHomes" 
          :key="home._id"
          class="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between group hover:border-gray-300 transition-all hover:shadow-md"
        >
          <div class="space-y-4">
            <div class="flex items-start justify-between gap-2">
              <div class="space-y-0.5 max-w-[70%]">
                <h3 class="font-extrabold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate" :title="home.title">
                  {{ home.title || 'Unnamed Listing' }}
                </h3>
                <p class="text-[10px] font-mono text-gray-400">ID: #{{ home._id.substring(18) }}</p>
              </div>
              <span 
                :class="home.status === 'sold' ? 'bg-gray-100 text-gray-500' : 'bg-emerald-50 text-emerald-600 border-emerald-100'"
                class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border"
              >
                {{ home.status || 'Active' }}
              </span>
            </div>

            <div class="p-3.5 bg-gray-50/80 rounded-xl space-y-3 border border-gray-50">
              <div class="text-xs flex gap-2.5 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div class="space-y-0.5">
                  <p class="text-[9px] font-black uppercase tracking-wider text-gray-400 leading-none">Mapbox Verified Address</p>
                  <p class="font-bold text-gray-700 leading-snug">{{ home.addressDetails?.fullAddress || 'Address field unmapped.' }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px] font-medium text-gray-400">
                <div>City: <span class="text-gray-700 font-bold">{{ home.addressDetails?.city || 'N/A' }}</span></div>
                <div>Zip Code: <span class="text-gray-700 font-mono font-bold">{{ home.addressDetails?.zipCode || 'N/A' }}</span></div>
              </div>
            </div>
          </div>

          <div class="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between gap-4">
            <span class="text-base font-black tracking-tight text-gray-900">
              {{ formatCurrency(home.price) }}
            </span>
            <div class="flex items-center gap-1.5">
              <button 
                @click="$router.push(`/realtor/inventory/edit/${home._id}`)"
                class="px-3 py-2 border border-gray-200 hover:border-gray-900 text-gray-600 hover:text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
              >
                Modify
              </button>
              <button 
                @click="$router.push(`/realtor/campaigns/create?homeId=${home._id}`)"
                class="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
              >
                Launch Lead Run
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>