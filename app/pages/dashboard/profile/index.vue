<script setup lang="ts">
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

/**
 * GHOSTFORM CLIENT PROFILE MODULE
 * NUXT 4 / UI v3 + ZOD SPECIFICATION
 */
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

// 1. Structural Schema Validation
const schema = z.object({
    name: z.string().min(2, 'Identity tag required'),
    email: z.string().email('Invalid intelligence routing link'),
    phone: z.string().min(10, 'Contact telemetry sequence incomplete'),
    company: z.string().min(2, 'Professional affiliation required'),
    region: z.string().min(2, 'Operational area baseline required')
})

type Schema = z.infer<typeof schema>

// 2. Client Profile Local Handshake
const state = reactive<Schema>({
    name: data.value?.name,
    email: data.value?.email,
    phone: data.value?.phone,
    company: data.value?.company,
    region: data.value.region
})

const isEditing = ref(false)
const toast = useToast()

// 3. Database Write Synchronization
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        // Send persistent updates to your MongoDB user profile handler
        await $fetch('/api/user/profile', {
            method: 'PUT',
            body: event.data
        })

        isEditing.value = false
        toast.add({ title: 'Profile Config Synced', color: 'neutral' })
    } catch (error) {
        toast.add({ title: 'Write Transaction Aborted', description: 'Database failed to acknowledge update.', color: 'warning' })
    }
}

</script>

<template>
    <!-- Removed ref="pageRef" -->
    <div class="min-h-screen p-4 sm:p-8">
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
                                <div
                                    class="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-3">
                                    <span class="text-zinc-500 uppercase tracking-wider">Account Node</span>
                                    <UBadge color="neutral" variant="subtle"
                                        class="font-black text-[9px] uppercase tracking-widest px-2.5">Phantom Tier
                                    </UBadge>
                                </div>
                                <div class="flex justify-between items-center text-xs font-mono">
                                    <span class="text-zinc-500 uppercase tracking-wider">Stripe Sync</span>
                                    <span class="text-zinc-400 font-bold">Active</span>
                                </div>
                            </div>
                        </section>

                        <section class="lg:col-span-8">
                            <div
                                class="backdrop-blur-2xl bg-white/2 border border-white/8 rounded-[2.5rem] shadow-2xl p-4">
                                <UButton v-if="!isEditing" variant="subtle" color="neutral"
                                    icon="i-heroicons-pencil-square"
                                    class="rounded-xl px-5 py-2.5 text-xs font-black tracking-wider uppercase"
                                    @click="isEditing = true">
                                    Modify Profile
                                </UButton>

                                <UForm :schema="schema" :state="state" class="space-y-6 p-8 lg:p-10" @submit="onSubmit">

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <UFormField label="Name" name="name">
                                            <UInput v-model="state.name" :disabled="!isEditing" variant="none" />
                                        </UFormField>

                                        <UFormField label="Email" name="email">
                                            <UInput v-model="state.email" :disabled="!isEditing" type="email"
                                                variant="none" />
                                        </UFormField>
                                    </div>

                                    <UFormField label="Mobile (SMS)" name="phone">
                                        <UInput v-model="state.phone" :disabled="!isEditing" type="tel"
                                            variant="none" />
                                    </UFormField>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <UFormField label="Company" name="brokerage">
                                            <UInput v-model="state.company" :disabled="!isEditing" variant="none" />
                                        </UFormField>

                                        <UFormField label="Primary Location" name="region">
                                            <UInput v-model="state.region" :disabled="!isEditing" variant="none" />
                                        </UFormField>
                                    </div>

                                    <div v-if="isEditing"
                                        class="flex justify-end gap-3 pt-6 border-t border-white/5 mt-8">
                                        <UButton variant="ghost" color="neutral"
                                            class="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                                            @click="isEditing = false">
                                            Cancel Changes
                                        </UButton>
                                        <UButton type="submit" color="neutral"
                                            class="rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(48,207,67,0.2)]">
                                            Commit Sync
                                        </UButton>
                                    </div>
                                </UForm>

                            </div>
                        </section>

                    </div>
                </main>
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
                <button @click="logout"
                    class="px-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
                    Sign Out
                </button>

                <baseDeleteProfile />
            </div>

        </div>
    </div>
</template>
