<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';
import { formVarient, inputVarient } from '~/utils/varients';

useHead({
    title: 'GhostForm | Resetting Password',
    meta: [
        { name: 'description', content: 'GhostForm Resetting Password.' },
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

    <div class="flex items-center justify-center py-20 relative overflow-hidden">

        <main class="w-full max-w-110 z-10">
            <div class="backdrop-blur-xl bg-white/3 border border-white/8 rounded-3xl p-10 shadow-2xl">

                <header class="text-center mb-12">
                    <h1 class="text-3xl font-bold tracking-tight text-white mb-2">GhostForm</h1>
                    <p class="text-zinc-400 text-sm">Reset your password</p>
                </header>

                <div class="space-y-6">
                    <form @submit.prevent="log" class="space-y-6">

                        <div v-motion="{ ...inputVarient() }">
                            <baseLabel text="Password" />
                            <input id="password" type="password" v-model="input.password" placeholder="Password"
                                required
                                class="w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis" />
                        </div>

                        <div v-motion="{ ...inputVarient() }">
                            <baseLabel text="Confirm Password" />
                            <input id="password" type="password" v-model="input.confirm_password"
                                placeholder="Confirm Password" required
                                class="w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis" />
                        </div>

                        <div v-motion="{ ...inputVarient() }">
                            <baseButtonSubmit text="Update" :isLoading="isLoading" />
                        </div>
                    </form>

                    <div v-motion="{ ...inputVarient() }" class="relative flex items-center justify-center py-4">
                        <div class="absolute w-full border-t border-gray-700"></div>
                        <span class="relative z-10 bg-gray-800/80 backdrop-blur-md px-4 text-gray-400 text-sm">OR</span>
                    </div>

                    <!-- Signup Link -->
                    <div class="text-center" v-motion="{ ...inputVarient() }">
                        <p class="text-center text-xs text-zinc-500">
                            Already have an account? <NuxtLink to="/login" class="text-cyan-400 hover:underline">Access
                                Login
                            </NuxtLink>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>