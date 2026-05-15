<script setup lang="ts">
// import type { User } from '~/types/auth';

// definePageMeta({
//     middleware: ['auth'],
// });

useHead({
    title: 'Ascend | Main',
    meta: [
        { name: 'description', content: 'Ascend Main.' },
    ],
});

// const { user, clear: clearSession } = useUserSession();
// const useUser = ref<User>(user?.value);


// async function logout() {
//     await clearSession()
//     await navigateTo('/login')
// };
    
</script>

<template>
    <div>
        <!-- <h1>Welcome {{ useUser?.first_name }}</h1> -->
        <!-- <button @click="logout">Logout</button> -->
    </div>
</template>