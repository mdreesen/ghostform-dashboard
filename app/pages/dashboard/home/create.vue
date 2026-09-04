<script setup lang="ts">
definePageMeta({ layout: 'authenticated' });

useHead({ title: 'GhostForm | Add a property' });

const toast = useToast();
const isLoading = ref(false);
const errorMessage = ref('');

const input = reactive({
  name: '',
  address: '',
  owner: '',
  notes: '',
  status: 'active'
});

// The address is the only genuinely required field — it's what gets attached
// to a captured lead so the realtor knows which listing it came from.
const canSave = computed(() => input.address.trim().length > 3);

async function save() {
  if (!canSave.value) {
    errorMessage.value = 'Please enter the property address.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    await $fetch('/api/homes/create', { method: 'POST', body: { ...input } });
    // Refresh the shared cache so the forms page picker has it immediately.
    await refreshNuxtData('homes');
    toast.add({ title: 'Property added.', color: 'success' });
    await navigateTo('/dashboard/home');
  } catch (error: any) {
    errorMessage.value = error?.data?.message || 'Could not save that property.';
    toast.add({ title: 'Failed to save. Please try again.', color: 'error', duration: 8000 });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="gf-measure-page">

    <header class="mb-14 pt-4">
      <NuxtLink to="/dashboard/home" class="h-label inline-block mb-6 hover:text-[#4C5741] transition-colors gf-rise"
        style="--d:.04s">
        ← All properties
      </NuxtLink>

      <h1 class="gf-display text-[clamp(32px,4.2vw,52px)] mb-4 gf-rise" style="--d:.1s">
        Add a property.
      </h1>
      <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[50ch] gf-rise" style="--d:.18s">
        Once it's here, you can attach it to an open house QR code and every lead
        who signs in gets tagged to this address.
      </p>
    </header>

    <section class="gf-depth">
      <form class="space-y-8" @submit.prevent="save">

        <div>
          <label for="address" class="h-label block mb-3">Address <span class="text-[#B5563A]">*</span></label>
          <input id="address" v-model="input.address" placeholder="348 Whitefish Stage Rd, City, State"
            class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#4C5741] transition-colors" />
          <p class="text-[12.5px] text-[#A9A39A] mt-2.5">
            This is what gets attached to each lead, so write it how you'd say it.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-6">
          <div>
            <label for="name" class="h-label block mb-3">Nickname</label>
            <input id="name" v-model="input.name" placeholder="The lake cabin"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#4C5741] transition-colors" />
            <p class="text-[12.5px] text-[#A9A39A] mt-2.5">
              Optional — makes it easier to spot in the picker.
            </p>
          </div>

          <div>
            <label for="status" class="h-label block mb-3">Status</label>
            <select id="status" v-model="input.status"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#4C5741] transition-colors">
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        <div>
          <label for="owner" class="h-label block mb-3">Owner</label>
          <input id="owner" v-model="input.owner" placeholder="Who you're representing"
            class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#4C5741] transition-colors" />
        </div>

        <div>
          <label for="notes" class="h-label block mb-3">Notes</label>
          <textarea id="notes" v-model="input.notes" rows="5"
            placeholder="Anything you want to remember — showing times, quirks, what buyers keep asking about."
            class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] leading-relaxed resize-none focus:outline-none focus:border-[#4C5741] transition-colors" />
        </div>

        <div v-if="errorMessage" class="p-4 border-l-2 border-[#B5563A] bg-[#B5563A]/5">
          <p class="text-[13.5px] text-[#1F1B16]">{{ errorMessage }}</p>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <button type="submit" :disabled="isLoading || !canSave"
            class="px-7 py-3.5 bg-[#1F1B16] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:opacity-[0.86] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {{ isLoading ? 'Saving…' : 'Save property' }}
          </button>

          <NuxtLink to="/dashboard/home"
            class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors">
            Cancel
          </NuxtLink>
        </div>
      </form>
    </section>

  </div>
</template>
