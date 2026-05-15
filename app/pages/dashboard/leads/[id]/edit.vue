<script setup lang="ts">
import { selection_status_lead } from '~/utils/dropdowns/selections';
import type { Lead } from '~/types/lead';
definePageMeta({
    layout: 'authenticated',
});

const route = useRoute();

const { data: data, pending: pending_data } = await useFetch<Lead>(`/api/leads/${route.params.id}`);
const toast = useToast();

const lead = ref(data.value);
const isLoading = ref(false);
let errorMessage = ref('');

const input = reactive({
    address: '',
    age: 0,
    bathrooms: 0,
    bedrooms: 0,
    budget: 0,
    buy_sell_both: '',
    date: '',
    email: '',
    message: '',
    name: '',
    phone: '',
    price: 0,
    sqft: 0,
    status: '',
    want_to_move: '',
});

if (data.value) {
    input.address = data.value.address;
    input.age = data.value.age;
    input.bathrooms = data.value.bathrooms;
    input.bedrooms = data.value.bedrooms;
    input.budget = data.value.budget;
    input.buy_sell_both = data.value.buy_sell_both;
    input.date = data.value.date;
    input.email = data.value.email;
    input.message = data.value.message;
    input.name = data.value.name;
    input.phone = data.value.phone;
    input.price = data.value.price
    input.sqft = data.value.sqft;
    input.status = data.value.status;
    input.want_to_move = data.value.want_to_move
};

async function log() {
    isLoading.value = true;
    $fetch(`/api/leads/${route.params.id}`, {
        method: 'PUT',
        body: { _id: lead.value._id, ...input, ai_analysis: lead.value.ai_analysis }
    })
        .then(async () => {
            await refreshNuxtData(['leads', 'status']);
            await navigateTo(`/dashboard/leads/${route.params.id}/details`);
        })
        .catch(async (error) => {
            toast.error("Failed to update", 'Try again');
            console.log(error);
            errorMessage.value = error.statusMessage;
            isLoading.value = false;
        });
};

async function delete_log() {
    isLoading.value = true;
    $fetch(`/api/leads/${route.params.id}`, {
        method: 'DELETE',
        body: input
    })
        .then(async () => {
            await refreshNuxtData(['leads', 'status']);
            await navigateTo(`/dashboard/leads`);
        })
        .catch(async (error) => {
            toast.error("Failed to delete", 'Try again');
            console.log(error);
            errorMessage.value = error.statusMessage;
            isLoading.value = false;
        });
};
</script>

<template>
    <div v-if="!pending_data" class="min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden">
        <baseHeaderBase :text="`Edit ${lead?.name}`" />
        <form @submit.prevent="log" class="space-y-6">

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Status" />

                <select id="status-select" v-model="input.status" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option disabled value="">Status</option>
                    <option v-for="status in selection_status_lead" :value="status.value" :key="status.label">
                        {{ status.label }}
                    </option>
                </select>
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Name" />
                <input id="text" type="text" v-model="input.name" placeholder="Name" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Age" />
                <input id="text" type="number" v-model="input.age" placeholder="Age"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Email" />
                <input id="text" type="text" v-model="input.email" placeholder="Email" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Address" />
                <input id="text" type="text" v-model="input.address" placeholder="Address"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Wants to move" />
                <input id="text" type="text" v-model="input.want_to_move" placeholder="Wants to move"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Buy, sell, or both" />
                <input id="text" type="text" v-model="input.buy_sell_both" placeholder="Buy, sell, or both"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Estimated home price" />
                <input id="text" type="number" v-model="input.price" placeholder="Estimated home price"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Sqft of home" />
                <input id="text" type="number" v-model="input.sqft" placeholder="Sqft of home"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Bedrooms" />
                <input id="text" type="number" v-model="input.bedrooms" placeholder="Bedrooms"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Bathrooms" />
                <input id="text" type="number" v-model="input.bathrooms" placeholder="Bathrooms"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Budget" />
                <input id="text" type="text" v-model="input.budget" placeholder="Budget"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Message" />
                <input id="text" type="text" v-model="input.message" placeholder="Message"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div class="flex flex-col gap-8 pb-4">
                <baseButtonSubmit text="Save" :isLoading="isLoading" />
                <baseButtonNavigate text="Cancel" :path="`/dashboard/leads/${route.params.id}/details`" :isLoading="isLoading" />
                <baseButtonSubmit @click="delete_log" text="Delete" :isLoading="isLoading" />
            </div>
        </form>
    </div>
</template>