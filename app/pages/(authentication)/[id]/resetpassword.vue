<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { formVarient, containerVarient, inputVarient } from '~/utils/varients';

useHead({
    title: 'Ascend | Resetting Password',
    meta: [
        { name: 'description', content: 'Ascend Resetting Password.' },
    ],
});

const formRef = ref();
const isLoading = ref(false);
let errorMessage = ref('');

const { fetch: refreshSession } = useUserSession();
const route = useRoute();
const tokenId = route.params.id;
const toast = useToast();

const input = reactive({
    password: '',
    confirm_password: '',
});

async function log() {
    isLoading.value = true;
    $fetch(`/api/authentication/reset`, {
        method: 'POST',
        body: {
            ...input,
            token: tokenId
        }
    })
        .then(async () => {
            await refreshSession();
            await refreshNuxtData();
            await navigateTo('/login');
            isLoading.value = false;
        })
        .catch(async (error) => {
            toast.error("Reset password failed", 'Try again');
            console.log(error);
            errorMessage.value = error.statusMessage;
            isLoading.value = false;
        });
};

useMotion(formRef, { ...formVarient() });

</script>

<template>
    <div class="relative flex min-h-screen items-center justify-center bg-gray-950 p-4 overflow-hidden">
        <!-- Background Gradient -->
        <div class="absolute inset-0 z-0 bg-linear-to-br from-gray-950 via-gray-800 to-purple-950 opacity-70"></div>

        <!-- Hero Text -->
        <section class="flex flex-col items-center gap-8">
            <div class="text-center" v-motion="{ ...containerVarient() }">

                <h1 class="flex flex-col text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                    <span>Welcome to</span>
                    <span class="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                        ASCΞND
                    </span>
                </h1>
                <p class="mt-2 text-lg sm:text-xl text-gray-400">Create a new password</p>
            </div>

            <!-- Login Form Container -->
            <div ref="formRef"
                class="relative z-20 w-full   rounded-3xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl backdrop-blur-md space-y-6 transform transition-all duration-300">

                <!-- Message Area -->
                <div v-if="errorMessage" class="text-center py-2 px-4 rounded-lg" :class="'bg-red-600/30 text-red-400'"
                    v-motion="{ ...inputVarient() }">
                    {{ errorMessage }}
                </div>

                <!-- Login Form -->


                <form @submit.prevent="log" class="space-y-6">

                    <div v-motion="{ ...inputVarient() }">
                        <baseLabel text="Password" />
                        <input id="password" type="password" v-model="input.password" placeholder="Password" required
                            class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div v-motion="{ ...inputVarient() }">
                        <baseLabel text="Confirm password" />
                        <input id="confirm_password" type="password" v-model="input.confirm_password"
                            placeholder="Confirm password" required
                            class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div v-motion="{ ...inputVarient() }">
                        <button type="submit" :disabled="isLoading"
                            :class="`${isLoading ? 'bg-linear-to-r from-gray-500 to-gray-600' : 'bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'} w-full rounded-xl py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out`">
                            {{ isLoading ? 'Submitting...' : 'Submit' }}
                        </button>
                    </div>
                </form>

                <div v-motion="{ ...inputVarient() }" class="relative flex items-center justify-center py-4">
                    <div class="absolute w-full border-t border-gray-700"></div>
                    <span class="relative z-10 bg-gray-800/80 backdrop-blur-md px-4 text-gray-400 text-sm">OR</span>
                </div>

                <!-- Signup Link -->
                <div class="text-center" v-motion="{ ...inputVarient() }">
                    <p class="text-gray-400 text-sm">
                        Log into your account
                        <NuxtLink to="/login" class="text-blue-400 hover:underline transition-colors">log in
                        </NuxtLink>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>