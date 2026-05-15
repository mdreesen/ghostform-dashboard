<script setup lang="ts">
import { ref } from 'vue';
import packageJson from '../../../../package.json';
import { formatDate } from '~/utils/date';
import { timeZone } from '~/utils/date';

definePageMeta({
    layout: 'authenticated',
});

const { data } = useNuxtData('profile');

const { clear: clearSession } = useUserSession();

async function logout() {

    await clearSession();
    await navigateTo('/login');
};

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
                CONSTRUCTION ZONE<br>
                WORK IN PROGRESS
            </div>

            <!-- Action Button Example -->
            <div class="flex flex-col mt-4 pt-8 border-t border-gray-700 text-gray-400">
                <span>Date: {{ formatDate() }}</span>
                <span>Time zone: {{ timeZone() }}</span>
                <span>Version: {{ packageJson.version }}</span>
                <NuxtLink to="/dashboard/privacy-policy" class="underline">Privacy Policy</NuxtLink>
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