<script setup lang="ts">
/**
 * A textarea with a microphone.
 *
 * Voice SUPPLEMENTS typing, never replaces it. A realtor in a quiet office
 * types; one in a truck after a showing talks. The same field has to serve
 * both, and the transcript stays editable — voice gets street names and
 * surnames wrong often enough that saving it unread would be worse than not
 * offering it.
 */
const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
  rows?: number
  label?: string
  hint?: string
}>(), { placeholder: '', rows: 3, label: '', hint: '' })

const emit = defineEmits<{ 'update:modelValue': [string] }>()

const { supported, listening, transcript, displayText, error, toggle, reset } = useVoiceInput()

// Speaking appends to whatever is already typed rather than replacing it, so
// you can start typing, add a sentence by voice, and keep going.
let baseText = ''
watch(listening, (on) => {
  if (on) { baseText = props.modelValue; reset() }
})
watch(displayText, (t) => {
  if (!listening.value || !t) return
  emit('update:modelValue', [baseText, t].filter(Boolean).join(' ').trim())
})
</script>

<template>
  <div>
    <div v-if="label" class="flex items-baseline justify-between gap-3 mb-2">
      <label class="gf-meta">{{ label }}</label>
      <button
        v-if="supported"
        type="button"
        class="flex items-center gap-1.5 gf-label transition-colors"
        :class="listening ? 'text-[#B5563A]' : 'text-[#A9A39A] hover:text-[#1F1B16]'"
        @click="toggle"
      >
        <!-- Filled while listening, outline when idle — readable without colour -->
        <svg width="12" height="12" viewBox="0 0 24 24" :fill="listening ? 'currentColor' : 'none'"
             stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" />
        </svg>
        {{ listening ? 'Listening — tap to stop' : 'Speak' }}
      </button>
    </div>

    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      class="w-full bg-[#F7F4EF] border px-3.5 py-2.5 gf-body resize-none focus:outline-none transition-colors"
      :class="listening ? 'border-[#B5563A]' : 'border-[#DDD6C9] focus:border-[#B5563A]'"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <p v-if="listening" class="gf-label text-[#B5563A] mt-1.5">
      Speak naturally — you can edit it after.
    </p>
    <p v-else-if="error" class="gf-label text-[#B5563A] mt-1.5">{{ error }}</p>
    <p v-else-if="hint" class="gf-label gf-muted mt-1.5">{{ hint }}</p>
  </div>
</template>
