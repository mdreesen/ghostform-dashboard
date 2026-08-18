<script setup lang="ts">
import { date } from '~/utils/date';
import { selection_status_lead } from '~/utils/dropdowns/selections';

definePageMeta({
    layout: 'authenticated',
});

const toast = useToast();

const isLoading = ref(false);
let errorMessage = ref('');

const input = reactive({
    name: '',
    owner: '',
    email: '',
    address: '',
    notes: '',
    date: '',
});

async function log() {
    isLoading.value = true;
    $fetch(`/api/homes/create`, {
        method: 'POST',
        body: { ...input, date: date() }
    })
        .then(async () => {
            await refreshNuxtData(['leads', 'status']);
            await navigateTo(`/dashboard/forms`);
        })
        .catch(async (error) => {
            toast.error("Failed to update", 'Try again');
            console.log(error);
            errorMessage.value = error.statusMessage;
            isLoading.value = false;
        });
};
</script>

<template>
    <div>
        <baseHeaderBase :text="`Create New Home`" />
        <form @submit.prevent="log" class="space-y-6">

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Name" />
                <input id="name" type="text" v-model="input.name" placeholder="Name of home (nickname)"
                    class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Address" />
                <input id="address" type="text" v-model="input.address" placeholder="Address" required
                    class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Owners name" />
                <input id="owners" type="text" v-model="input.owner" placeholder="Who owns the home"
                    class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Notes" />
                <input id="owners" type="text" v-model="input.notes" placeholder="Notes about the home"
                    class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]" />
            </div>

            <div class="flex flex-col gap-8 pb-4">
                <baseButtonSubmit text="Save" :isLoading="isLoading" />
                <baseButtonNavigate text="Cancel" :path="`/dashboard/forms`"
                    :isLoading="isLoading" />
            </div>
        </form>
    </div>
</template>