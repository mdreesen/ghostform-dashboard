<script setup lang="ts">
definePageMeta({ layout: 'authenticated' })
useHead({ title: 'GhostForm | Import leads' })

/**
 * Three steps: choose a file, confirm the column mapping, review what will
 * happen. The confirmation step is the important one — a silent import that
 * drops 40 rows is worse than one that refuses, because the realtor believes
 * they have their whole database and finds out months later.
 */
import { parseCsv, guessColumns, mapRows } from '~/utils/leadImport'

const toast = useToast()
const fileInput = ref<HTMLInputElement | null>(null)
const step = ref<'file' | 'map' | 'done'>('file')
const importing = ref(false)

const rows = ref<string[][]>([])
const guesses = ref<any[]>([])
const mapping = ref<Record<number, string | null>>({})
const onDuplicate = ref<'skip' | 'update'>('skip')
const result = ref<any>(null)

const FIELDS = [
  { value: null, label: "Don't import" },
  { value: 'name', label: 'Full name' },
  { value: 'first_name', label: 'First name' },
  { value: 'last_name', label: 'Last name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'buy_sell_both', label: 'Buying or selling' },
  { value: 'budget', label: 'Budget' },
  { value: 'address', label: 'Address' },
  { value: 'notes', label: 'Notes' },
  { value: 'source', label: 'Where they came from' }
]

const preview = computed(() => {
  if (!rows.value.length) return null
  return mapRows(rows.value, mapping.value)
})

const hasEmail = computed(() => Object.values(mapping.value).includes('email'))

async function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  try {
    const text = await file.text()
    const parsed = parseCsv(text)
    if (parsed.length < 2) {
      toast.error('That file has no rows under the header.')
      return
    }
    rows.value = parsed
    guesses.value = guessColumns(parsed[0]!, parsed[1])
    const m: Record<number, string | null> = {}
    guesses.value.forEach((g, i) => { m[i] = g.field })
    mapping.value = m
    step.value = 'map'
  } catch (err) {
    toast.error('Could not read that file. Make sure it is a CSV.')
  } finally {
    if (fileInput.value) fileInput.value.value = ''
  }
}

async function runImport() {
  if (!preview.value?.ready.length) return
  importing.value = true
  try {
    result.value = await $fetch('/api/leads/import', {
      method: 'POST',
      body: { leads: preview.value.ready, onDuplicate: onDuplicate.value }
    })
    await refreshNuxtData('leads')
    step.value = 'done'
  } catch (err: any) {
    toast.error(err?.data?.message || 'Import failed. Please try again.')
  } finally {
    importing.value = false
  }
}
</script>

<template>
  <div class="gf-measure-page">
    <header class="mb-12 pt-4">
      <NuxtLink to="/dashboard/leads" class="h-label inline-block mb-5 hover:text-[#4C5741] transition-colors">
        ← Leads
      </NuxtLink>
      <h1 class="gf-display text-[clamp(30px,4vw,44px)] mb-4">Bring your leads across.</h1>
      <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[52ch]">
        Export a CSV from wherever your leads live now — a spreadsheet, your old
        CRM, Zillow — and we'll match up the columns for you.
      </p>
    </header>

    <!-- 1 · File -->
    <section v-if="step === 'file'">
      <div
        class="border border-dashed border-[#DDD6C9] p-14 text-center cursor-pointer hover:border-[#A9A39A] transition-colors"
        @click="fileInput?.click()"
      >
        <input ref="fileInput" type="file" accept=".csv,text/csv" class="hidden" @change="onFile" />
        <p class="font-display text-[19px] mb-2">Choose a CSV file</p>
        <p class="text-[13.5px] text-[#8A847C]">
          Most tools have an "Export" option that produces one.
        </p>
      </div>

      <div class="mt-8 p-5 bg-[#EFEAE0] border border-[#DDD6C9]">
        <p class="h-label mb-2.5">What we need</p>
        <p class="text-[13.5px] text-[#8A847C] leading-relaxed">
          An email address for each lead — that's what makes them contactable,
          and rows without one can't be imported. Everything else is optional
          and can be filled in later.
        </p>
      </div>
    </section>

    <!-- 2 · Mapping -->
    <section v-else-if="step === 'map'">
      <div class="flex items-baseline justify-between mb-6">
        <p class="h-label">Check the columns</p>
        <button class="text-[12.5px] text-[#8A847C] hover:text-[#1F1B16]" @click="step = 'file'">
          Choose a different file
        </button>
      </div>
      <p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[54ch] mb-8">
        We've guessed what each column is. Anything marked
        <span class="text-[#B5563A]">check this</span> is a guess worth
        confirming before you import.
      </p>

      <div class="border-t border-[#DDD6C9] mb-8">
        <div
          v-for="(g, i) in guesses" :key="i"
          class="grid gap-4 py-4 border-b border-[#DDD6C9] items-center"
          style="grid-template-columns: 1fr auto"
        >
          <div class="min-w-0">
            <p class="text-[14.5px] font-semibold truncate">{{ g.column }}</p>
            <p class="text-[12.5px] text-[#A9A39A] truncate">
              e.g. {{ g.sample || '(empty)' }}
              <span v-if="g.confidence === 'low'" class="text-[#B5563A]"> · check this</span>
            </p>
          </div>
          <select
            v-model="mapping[i]"
            class="bg-[#F7F4EF] border border-[#DDD6C9] px-3 py-2.5 text-[13.5px] focus:outline-none focus:border-[#4C5741]"
          >
            <option v-for="f in FIELDS" :key="String(f.value)" :value="f.value">{{ f.label }}</option>
          </select>
        </div>
      </div>

      <div v-if="!hasEmail" class="p-4 border-l-2 border-[#B5563A] bg-[#B5563A]/5 mb-8">
        <p class="text-[13.5px]">
          No column is set to Email. Pick one before importing — a lead without
          an email can't be followed up.
        </p>
      </div>

      <div v-else-if="preview" class="mb-8">
        <p class="h-label mb-4">What will happen</p>
        <div class="grid sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9] mb-5">
          <div class="bg-[#F7F4EF] p-5">
            <p class="font-display text-[30px] leading-none">{{ preview.ready.length }}</p>
            <p class="text-[12.5px] text-[#8A847C] mt-1.5">will be imported</p>
          </div>
          <div class="bg-[#F7F4EF] p-5">
            <p class="font-display text-[30px] leading-none">{{ preview.skipped.length }}</p>
            <p class="text-[12.5px] text-[#8A847C] mt-1.5">skipped</p>
          </div>
          <div class="bg-[#F7F4EF] p-5">
            <p class="font-display text-[30px] leading-none">{{ preview.duplicatesInFile }}</p>
            <p class="text-[12.5px] text-[#8A847C] mt-1.5">duplicates in the file</p>
          </div>
        </div>

        <!-- Named, not just counted. "12 skipped" tells you nothing. -->
        <details v-if="preview.skipped.length" class="mb-5">
          <summary class="text-[13px] text-[#B5563A] cursor-pointer">
            Why {{ preview.skipped.length }} were skipped
          </summary>
          <ul class="mt-3 space-y-1.5">
            <li v-for="s in preview.skipped.slice(0, 25)" :key="s.row" class="text-[12.5px] text-[#8A847C]">
              Row {{ s.row }} — {{ s.reason }}
            </li>
            <li v-if="preview.skipped.length > 25" class="text-[12.5px] text-[#A9A39A]">
              …and {{ preview.skipped.length - 25 }} more
            </li>
          </ul>
        </details>

        <p class="h-label mb-3">If a lead is already in your database</p>
        <div class="flex gap-2.5">
          <button
            v-for="opt in [
              { v: 'skip', l: 'Leave it alone', h: 'Keeps what you already have' },
              { v: 'update', l: 'Fill in blanks', h: 'Adds missing details only' }
            ]" :key="opt.v"
            class="flex-1 text-left px-4 py-3 border transition-colors"
            :class="onDuplicate === opt.v ? 'border-[#B5563A] bg-[#B5563A]/5' : 'border-[#DDD6C9]'"
            @click="onDuplicate = opt.v as any"
          >
            <span class="block text-[14px] font-semibold">{{ opt.l }}</span>
            <span class="block text-[12px] text-[#A9A39A] mt-0.5">{{ opt.h }}</span>
          </button>
        </div>
      </div>

      <button
        class="px-7 py-3.5 bg-[#1F1B16] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:opacity-[0.86] transition-colors disabled:opacity-40"
        :disabled="importing || !hasEmail || !preview?.ready.length"
        @click="runImport"
      >
        {{ importing ? 'Importing…' : `Import ${preview?.ready.length ?? 0} leads` }}
      </button>
    </section>

    <!-- 3 · Done -->
    <section v-else class="border border-[#DDD6C9] p-12 text-center">
      <p class="font-display text-[24px] mb-3">
        {{ result?.inserted }} leads added
      </p>
      <p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[44ch] mx-auto mb-8">
        <template v-if="result?.updated">{{ result.updated }} existing leads were updated. </template>
        They're on your list now and will appear in tomorrow's briefing.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <baseButtonNavigate text="See your leads" path="/dashboard/leads" />
        <button class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16]"
          @click="step = 'file'; result = null">
          Import another file
        </button>
      </div>
    </section>
  </div>
</template>
