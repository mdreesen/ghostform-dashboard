<script setup lang="ts">

const savingVoice = ref(false);
const voice = reactive({
  tone: 'warm', about: '', focus: '', emoji: 'some',
  hashtags: 'few', phrases: '', avoid: '', samples: ''
});

// Prefill from whatever they've already saved.
onMounted(() => {
  const existing = (useNuxtData('user').data.value as any)?.voice;
  if (existing) Object.assign(voice, existing);
});

async function saveVoice() {
  savingVoice.value = true;
  try {
    await $fetch('/api/user/voice', { method: 'POST', body: { ...voice } });
    await refreshNuxtData('user');
    useToast().success('Saved — your posts will sound more like you now.');
  } catch {
    useToast().error('Could not save. Please try again.');
  } finally {
    savingVoice.value = false;
  }
}


/** Restart the guided tour (the Tour component listens for this event). */
function replayTour() {
  if (import.meta.client) {
    try { localStorage.removeItem('ghostform:tourSeen') } catch { /* ignore */ }
    window.dispatchEvent(new Event('gf:tour'))
  }
}

import { ref } from 'vue';
import packageJson from '../../../../package.json';
import { formatDate } from '~/utils/date';
import { timeZone } from '~/utils/date';

definePageMeta({
  layout: 'authenticated',
});

const { data } = useNuxtData('user');

const { clear: clearSession } = useUserSession();

async function logout() {

  await clearSession();
  await navigateTo('/login');
};

import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

// 1. Structural Schema Validation
const schema = z.object({
  name: z.string().min(2, 'Identity tag required'),
  email: z.string().email('Invalid intelligence routing link'),
  phone: z.string().min(10, 'Contact telemetry sequence incomplete'),
  company: z.string().min(2, 'Professional affiliation required'),
  region: z.string().min(2, 'Operational area baseline required'),
  calendar_link: z.string().nullable()
})

type Schema = z.infer<typeof schema>

const state = reactive<Schema>({
  name: data.value?.name,
  email: data.value?.email,
  phone: data.value?.phone,
  company: data.value?.company,
  region: data.value.region,
  calendar_link: data.value.calendar_link
});

const isEditing = ref(false)
const toast = useToast()

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    await $fetch('/api/user', {
      method: 'PUT',
      body: event.data
    })

    isEditing.value = false
    toast.success('Updated Profile');
  } catch (error) {
    toast.error("Failed to delete", 'Try again');
  }
}

</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto py-10 flex flex-col gap-8">

      <!-- Header -->
      <header class="pb-8 border-b border-gray-700">
        <baseHeaderAuth text="Settings" subText="Manage your profile" />
      </header>

      <div>
        <main class="max-w-4xl mx-auto relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <section class="lg:col-span-4 space-y-6">
              <div class="backdrop-blur-xl bg-white/1 border border-white/6 rounded-4xl p-6 space-y-4">
                <div class="flex justify-between items-center text-xs font-mono border-b border-[#DDD6C9] pb-3">
                  <span class="text-[#8A847C] uppercase tracking-wider">Account Node</span>
                  <UBadge color="neutral" variant="subtle"
                    class="font-semibold text-[9px] uppercase tracking-widest px-2.5">Phantom Tier
                  </UBadge>
                </div>
                <div class="flex justify-between items-center text-xs font-mono">
                  <span class="text-[#8A847C] uppercase tracking-wider">Stripe Sync</span>
                  <span class="text-[#8A847C] font-bold">Active</span>
                </div>
              </div>
            </section>

            <section class="lg:col-span-8">
              <div class="backdrop-blur-2xl bg-[#F7F4EF] border border-[#DDD6C9] shadow-2xl">

                <div class="px-8 py-4">
                  <UButton v-if="!isEditing" variant="subtle" color="neutral" icon="i-heroicons-pencil-square"
                    class="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase" @click="isEditing = true">
                    Modify Profile
                  </UButton>
                </div>

                <UForm :schema="schema" :state="state" class="space-y-6 p-8 lg:p-10" @submit="onSubmit">

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormField label="Name" name="name">
                      <UInput v-if="isEditing" v-model="state.name" :disabled="!isEditing" variant="none"
                        class="truncate" />
                      <span v-else class="block truncate text-sm font-medium text-[#8A847C] max-w-50"
                        :title="state.name">
                        {{ state.name || '—' }}
                      </span>
                    </UFormField>

                    <UFormField label="Email" name="email">
                      <UInput v-if="isEditing" v-model="state.email" :disabled="!isEditing" type="email" variant="none"
                        class="truncate" />
                      <span v-else class="block truncate text-sm font-medium text-[#8A847C] max-w-50"
                        :title="state.email">
                        {{ state.email || '—' }}
                      </span>
                    </UFormField>
                  </div>

                  <UFormField label="Mobile (SMS)" name="phone">
                    <UInput v-if="isEditing" v-model="state.phone" :disabled="!isEditing" type="tel" variant="none"
                      class="truncate" />
                    <span v-else class="block truncate text-sm font-medium text-[#8A847C] max-w-50"
                      :title="state.phone">
                      {{ state.phone || '—' }}
                    </span>
                  </UFormField>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <UFormField label="Company" name="brokerage">
                      <UInput v-if="isEditing" v-model="state.company" :disabled="!isEditing" variant="none"
                        class="truncate" />
                      <span v-else class="block truncate text-sm font-medium text-[#8A847C] max-w-50"
                        :title="state.company">
                        {{ state.company || '—' }}
                      </span>
                    </UFormField>

                    <UFormField label="Primary Location" name="region">
                      <UInput v-if="isEditing" v-model="state.region" :disabled="!isEditing" variant="none"
                        class="truncate" />
                      <span v-else class="block truncate text-sm font-medium text-[#8A847C] max-w-50"
                        :title="state.region">
                        {{ state.region || '—' }}
                      </span>
                    </UFormField>


                    <UFormField label="Calendar Link" name="calendar_link">
                      <UInput v-if="isEditing" v-model="state.calendar_link" :disabled="!isEditing" variant="none"
                        class="truncate" />
                      <span v-else class="block truncate text-sm font-medium text-[#8A847C] max-w-50"
                        :title="state.calendar_link">
                        {{ state.calendar_link || '—' }}
                      </span>
                    </UFormField>
                  </div>

                  <div v-if="isEditing" class="flex justify-end gap-3 pt-6 border-t border-[#DDD6C9] mt-8">
                    <UButton variant="ghost" color="neutral"
                      class="px-5 py-2.5 text-xs font-bold uppercase tracking-wider" @click="isEditing = false">
                      Cancel Changes
                    </UButton>
                    <UButton type="submit" color="neutral"
                      class="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(48,207,67,0.2)]">
                      Update Profile
                    </UButton>
                  </div>
                </UForm>

              </div>
            </section>

          </div>
        </main>
      </div>

      <!-- Voice profile: drives how AI writes their social posts -->
      <div id="voice" class="mb-10 pb-10 border-b border-[#DDD6C9]">
        <p class="gf-eyebrow mb-3">Your voice</p>
        <p class="text-[14px] text-[#8A847C] leading-relaxed mb-7 max-w-[56ch]">
          This is what makes your social posts sound like you instead of like
          every other agent. The samples box matters most — paste a couple of
          posts you've actually written.
        </p>

        <div class="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="gf-eyebrow block mb-3">How you come across</label>
            <select v-model="voice.tone"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A]">
              <option value="warm">Warm and neighbourly</option>
              <option value="straight">Plain and direct</option>
              <option value="playful">Light and a bit funny</option>
              <option value="polished">Composed and professional</option>
            </select>
          </div>
          <div>
            <label class="gf-eyebrow block mb-3">Emoji</label>
            <select v-model="voice.emoji"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A]">
              <option value="none">None</option>
              <option value="some">A few</option>
              <option value="lots">Plenty</option>
            </select>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <label class="gf-eyebrow block mb-3">A bit about you</label>
            <input v-model="voice.about" placeholder="Grew up here, two kids, spend every free weekend on the lake"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A]" />
          </div>
          <div>
            <label class="gf-eyebrow block mb-3">What you want to be known for</label>
            <input v-model="voice.focus" placeholder="First-time buyers, and knowing every back road in the valley"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A]" />
          </div>
          <div>
            <label class="gf-eyebrow block mb-3">Words to avoid</label>
            <input v-model="voice.avoid" placeholder="dream home, don't miss out, hustle"
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A]" />
          </div>
          <div>
            <label class="gf-eyebrow block mb-3">Paste a couple of your real posts</label>
            <textarea v-model="voice.samples" rows="7"
              placeholder="Paste two or three posts you've written before. This teaches it your rhythm better than anything else here."
              class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[15px] leading-relaxed resize-none focus:outline-none focus:border-[#B5563A]" />
          </div>
        </div>

        <button :disabled="savingVoice"
          class="mt-7 px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40"
          @click="saveVoice">
          {{ savingVoice ? 'Saving…' : 'Save my voice' }}
        </button>
      </div>

      <!-- Action Button Example -->
      <div class="flex flex-col mt-4 pt-8 border-t border-gray-700 text-gray-400">
        <span>Date: {{ formatDate() }}</span>
        <span>Time zone: {{ timeZone() }}</span>
        <span>Version: {{ packageJson.version }}</span>
        <NuxtLink to="/privacy-policy" class="underline">Privacy Policy</NuxtLink>
      </div>

      <!-- Action Button Example -->
      <div class="flex flex-col gap-8 mt-10 pt-8 border-t border-gray-700">
          <p class="gf-eyebrow mb-3">Getting started</p>
          <p class="text-[14px] text-[#8A847C] leading-relaxed mb-5 max-w-[52ch]">
            Run the two-minute walkthrough again if you want a refresher on where
            everything lives.
          </p>
          <button
            class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
            @click="replayTour">
            Replay the tour
          </button>
      </div>

      <div class="flex flex-col gap-8 mt-10 pt-8 border-t border-gray-700">
        <button @click="logout"
          class="px-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
          Sign Out
        </button>
      </div>

      <div class="flex flex-col gap-8 mt-10 pt-8 border-t border-gray-700">
        <baseDeleteProfile />
      </div>

    </div>
  </div>
</template>
