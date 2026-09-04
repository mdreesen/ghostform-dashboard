<script setup lang="ts">
definePageMeta({ layout: 'authenticated' })

/**
 * PROPERTY DETAIL
 *
 * A home accumulates more than a list row can hold — documents, deadlines,
 * the leads who enquired, and eventually the AI Q&A. This gives each of those
 * room to breathe instead of competing inside one line of a table.
 */
const route = useRoute()
const id = route.params.id as string
const toast = useToast()

const { data, refresh, pending } = await useFetch<any>(`/api/homes/${id}`, {
  key: `home-${id}`,
  // Client-only for the same reason: no cookie during SSR means a 404/401 on
  // hard reload, and the property page would render as 'not found'.
  server: false,
  lazy: true
})

const home = computed(() => data.value?.home ?? null)
const leads = computed(() => data.value?.leads ?? [])

useHead({ title: () => `GhostForm | ${home.value?.name || home.value?.address || 'Property'}` })

const STATUS_LABEL: Record<string, string> = {
  active: 'Active', pending: 'Pending', sold: 'Sold'
}

const saving = ref(false)
const editing = ref(false)
const form = reactive({ name: '', address: '', owner: '', notes: '', status: 'active' })

watch(home, (h) => {
  if (!h) return
  form.name = h.name ?? ''
  form.address = h.address ?? ''
  form.owner = h.owner ?? ''
  form.notes = h.notes ?? ''
  form.status = h.status ?? 'active'
}, { immediate: true })

async function save() {
  saving.value = true
  try {
    await $fetch('/api/homes/update', { method: 'POST', body: { _id: id, ...form } })
    await refresh()
    editing.value = false
    toast.add({ title: 'Saved.' })
  } catch (err: any) {
    toast.add({ title: err?.data?.message || 'Could not save.', color: 'error', duration: 8000 })
  } finally {
    saving.value = false
  }
}

async function setStatus(status: string) {
  form.status = status
  await save()
}

</script>

<template>
  <div class="gf-measure-page-wide">
    <header class="pt-4 mb-12">
      <NuxtLink to="/dashboard/home" class="h-label inline-block mb-6 hover:text-[#4C5741] transition-colors">
        ← Properties
      </NuxtLink>

      <div v-if="pending && !home" class="gf-body text-[#8A847C]">Loading…</div>

      <template v-else-if="home">
        <div class="flex flex-wrap items-start justify-between gap-5">
          <div class="min-w-0">
            <h1 class="font-display text-[clamp(28px,4vw,42px)] leading-[1.12] tracking-tight mb-2">
              {{ home.name || home.address }}
            </h1>
            <p v-if="home.name && home.address" class="gf-body text-[#8A847C]">
              {{ home.address }}
            </p>
          </div>

          <!-- Status is the thing that changes most, so it stays one click away -->
          <div class="flex gap-2">
            <button
              v-for="s in (['active','pending','sold'] as const)" :key="s"
              class="px-3.5 py-2 gf-label uppercase tracking-[0.1em] border transition-colors"
              :class="form.status === s
                ? 'border-[#1F1B16] text-[#1F1B16]'
                : 'border-[#DDD6C9] text-[#A9A39A] hover:border-[#8A847C]'"
              :disabled="saving"
              @click="setStatus(s)"
            >
              {{ STATUS_LABEL[s] }}
            </button>
          </div>
        </div>
      </template>
    </header>

    <template v-if="home">
      <!-- ── Details ── -->
      <section class="mb-14">
        <div class="flex items-baseline justify-between mb-5">
          <p class="h-label">Details</p>
          <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="editing = !editing">
            {{ editing ? 'Cancel' : 'Edit' }}
          </button>
        </div>

        <div v-if="!editing" class="border-t border-[#DDD6C9]">
          <div v-for="row in [
            { k: 'Address', v: home.address },
            { k: 'Owner', v: home.owner },
            { k: 'Notes', v: home.notes }
          ]" :key="row.k" class="grid gap-4 py-4 border-b border-[#DDD6C9]" style="grid-template-columns:140px 1fr">
            <p class="gf-meta uppercase tracking-[0.1em] text-[#A9A39A]">{{ row.k }}</p>
            <p class="gf-body leading-relaxed whitespace-pre-line">
              {{ row.v || '—' }}
            </p>
          </div>
        </div>

        <div v-else class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block gf-meta text-[#8A847C] mb-2">Name</label>
              <input v-model="form.name" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body focus:outline-none focus:border-[#4C5741]" />
            </div>
            <div>
              <label class="block gf-meta text-[#8A847C] mb-2">Owner</label>
              <input v-model="form.owner" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body focus:outline-none focus:border-[#4C5741]" />
            </div>
          </div>
          <div>
            <label class="block gf-meta text-[#8A847C] mb-2">Address</label>
            <input v-model="form.address" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body focus:outline-none focus:border-[#4C5741]" />
          </div>
          <div>
            <label class="block gf-meta text-[#8A847C] mb-2">Notes</label>
            <textarea v-model="form.notes" rows="4" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body resize-none focus:outline-none focus:border-[#4C5741]" />
          </div>
          <button
            class="px-6 py-3 bg-[#1F1B16] text-[#F7F4EF] gf-label uppercase tracking-[0.12em] font-semibold hover:opacity-[0.86] disabled:opacity-40"
            :disabled="saving" @click="save"
          >
            {{ saving ? 'Saving…' : 'Save changes' }}
          </button>
        </div>
      </section>

      <!-- ── Documents ── -->
      <section class="mb-14">
        <p class="h-label mb-2">Documents</p>
        <p class="gf-meta text-[#8A847C] leading-relaxed max-w-[56ch] mb-6">
          Contracts, inspections, disclosures. We'll pull out the dates that
          matter and you confirm each one before it becomes a reminder.
        </p>
        <appAskDocuments :home-id="id" class="mb-8" />
        <appDocumentUpload :home-id="id" class="mb-2"  />
        <appDocumentList :home-id="id" />
      </section>

      <!-- ── Interested leads ── -->
      <section class="mb-14">
        <p class="h-label mb-2">Interested</p>
        <p class="gf-meta text-[#8A847C] leading-relaxed max-w-[56ch] mb-6">
          Anyone who enquired about this property, including open-house sign-ins.
        </p>

        <div v-if="leads.length" class="border-t border-[#DDD6C9]">
          <NuxtLink
            v-for="lead in leads" :key="lead._id"
            :to="`/dashboard/leads/${lead._id}/details`"
            class="flex items-center justify-between gap-4 py-4 border-b border-[#DDD6C9] hover:bg-[#DDD6C9]/25 transition-colors px-1.5"
          >
            <div class="min-w-0">
              <p class="gf-body font-semibold truncate">{{ lead.name || lead.email }}</p>
              <p class="gf-meta text-[#8A847C] truncate">
                {{ lead.email }}
                <template v-if="lead.phone"> · {{ lead.phone }}</template>
              </p>
            </div>
            <span class="gf-label uppercase tracking-[0.1em] text-[#A9A39A] shrink-0">
              {{ lead.status || 'new' }}
            </span>
          </NuxtLink>
        </div>
        <p v-else class="gf-meta text-[#8A847C] py-4">
          Nobody yet. Leads captured at this address will show up here.
        </p>
      </section>

      <!-- ── Marketing ── -->
      <section class="pb-16">
        <p class="h-label mb-5">Marketing</p>
        <div class="flex flex-wrap gap-2.5">
          <NuxtLink
            to="/dashboard/forms"
            class="px-5 py-3 border border-[#B5563A] text-[#B5563A] gf-label uppercase tracking-[0.1em] hover:bg-[#1F1B16] hover:text-[#F7F4EF] transition-colors"
          >
            Make a QR code
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>
