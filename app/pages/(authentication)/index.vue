<script setup lang="ts">
// import type { User } from '~/types/auth';

// definePageMeta({
//     middleware: ['auth'],
// });

useHead({
    title: 'GhostForm | Main',
    meta: [
        { name: 'description', content: 'GhostForm Main.' },
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