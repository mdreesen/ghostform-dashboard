<script setup lang="ts">
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
});

const { fetch: refreshSession } = useUserSession();
const toast = useToast();

const loading = ref(false);
const emit = defineEmits<{ close: [boolean] }>();
const open = ref(false);

const useDelete = async () => {
    loading.value = true

    try {
        await $fetch('/api/campaigns', {
            method: 'DELETE',
            body: props.data
        })
        await refreshSession();
        await refreshNuxtData('campaigns');
        toast.success('Automation Deleted');
        open.value = false;

    } catch (error) {
        toast.error('Failed to mount criteria templates.');
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="backdrop-blur-xl bg-white/2 border border-white/8 p-8 rounded-3xl w-full sm:w-full md:w-full lg:w-75">
        <baseHeaderSection :text="data?.title" />
        <div class="flex flex-col gap-6">
            <div class="text-md font-bold tabular-nums">
                Campaign for <span class="text-cyan-400">{{ data?.targetStatus }}</span> leads
            </div>

            <p class="text-md font-bold tabular-nums">{{ data?.subject }}</p>

            <div>
                <UModal :title="`Delete ${data?.title} Campaign?`" v-model:open="open">
                    <UButton label="Delete Campaign" color="error" variant="subtle" />

                    <template #body>
                        <baseButtonDelete label="Delete" @click="useDelete" />
                    </template>
                </UModal>
            </div>
        </div>
    </div>
</template>