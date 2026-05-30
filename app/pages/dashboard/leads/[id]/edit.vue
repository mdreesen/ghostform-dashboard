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
    source: '',
    name: '',
    age: 0,
    email: '',
    phone: '',
    date: '',
    status: '',
    best_communication_method: '',
    address: '',
    want_to_move: '',
    buy_sell_both: '',
    price: 0,
    sqft: 0,
    bedrooms: 0,
    bathrooms: 0,
    budget: 0,
    notes: '',
    seeing_an_agent: '',
});

if (data.value) {
    input.source = data.value.source  ?? '',
    input.name = data.value.name ?? '',
    input.age = data.value.age ?? 0,
    input.email = data.value.email  ?? '',
    input.phone = data.value.phone ?? '',
    input.date = data.value.date  ?? '',
    input.status = data.value.status  ?? '',
    input.best_communication_method = data.value.best_communication_method  ?? '',
    input.address = data.value.address  ?? '',
    input.want_to_move = data.value.want_to_move  ?? '',
    input.buy_sell_both = data.value.buy_sell_both  ?? '',
    input.price = data.value.price ?? 0,
    input.sqft = data.value.sqft ?? 0,
    input.bedrooms = data.value.bedrooms ?? 0,
    input.bathrooms = data.value.bathrooms ?? 0,
    input.budget = data.value.budget ?? 0,
    input.notes = data.value.notes ?? '',
    input.seeing_an_agent = data.value.seeing_an_agent ?? ''
};

async function log() {
    isLoading.value = true;
    $fetch(`/api/leads/${route.params.id}`, {
        method: 'PUT',
        body: { userId: lead.value.userId, _id: lead.value._id, ...input, ai_analysis: lead.value.ai_analysis ?? '' }
    })
        .then(async () => {
            await refreshNuxtData('leads');
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
    <div v-if="!pending_data">
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
                <baseLabel text="Source" />
                <input id="source" type="text" v-model="input.source" placeholder="Source (where the lead came from)" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Name" />
                <input id="name" type="text" v-model="input.name" placeholder="Name" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Age" />
                <input id="age" type="number" v-model="input.age" placeholder="Age"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Email" />
                <input id="email" type="text" v-model="input.email" placeholder="Email" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Phone" />
                <input id="phone" type="text" v-model="input.phone" placeholder="Phone" required
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Address" />
                <input id="address" type="text" v-model="input.address" placeholder="Address"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Best communication method" />
                <input id="best_communication_method" type="text" v-model="input.best_communication_method" placeholder="Email, calling, texting..."
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Wants to move" />
                <input id="want_to_move" type="text" v-model="input.want_to_move" placeholder="Wants to move"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Buy, sell, or both" />
                <input id="buy_sell_both" type="text" v-model="input.buy_sell_both" placeholder="Buy, sell, or both"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Estimated home price" />
                <input id="price" type="number" v-model="input.price" placeholder="Estimated home price"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Sqft of home" />
                <input id="sqft" type="number" v-model="input.sqft" placeholder="Sqft of home"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Bedrooms" />
                <input id="bedrooms" type="number" v-model="input.bedrooms" placeholder="Bedrooms"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Bathrooms" />
                <input id="bathrooms" type="number" v-model="input.bathrooms" placeholder="Bathrooms"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Budget" />
                <input id="budget" type="number" v-model="input.budget" placeholder="Budget"
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Seeing an agent" />
                <input id="seeing_an_agent" type="text" v-model="input.seeing_an_agent" placeholder="Yes, no, agents name perhaps..."
                    class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div v-motion="{ ...inputVarient() }">
                <baseLabel text="Notes" />
                <input id="notes" type="text" v-model="input.notes" placeholder="Notes about lead"
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