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
const toggling = ref(false);
const emit = defineEmits<{ close: [boolean] }>();
const open = ref(false);

// Human-readable cadence from the stored timesPerMonth value.
const cadenceLabel = computed(() => {
    switch (props.data?.timesPerMonth) {
        case 4: return 'Weekly'
        case 2: return 'Every other week'
        case 1: return 'Monthly'
        default: return 'Monthly'
    }
});

const dayLabel = computed(() => {
    const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
    return days[props.data?.dayOfWeek] ?? '';
});

// Treat a missing 'active' flag (legacy campaigns) as active.
const isActive = computed(() => props.data?.active !== false);

const useToggle = async () => {
    toggling.value = true
    try {
        await $fetch('/api/campaigns/toggle', {
            method: 'POST',
            body: { _id: props.data._id, active: !isActive.value }
        })
        await refreshNuxtData('campaigns');
        toast.success(isActive.value ? 'Campaign paused' : 'Campaign resumed');
    } catch (error) {
        toast.error('Could not update campaign.');
    } finally {
        toggling.value = false
    }
}

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
    <div class="bg-[#F7F4EF] border border-[#DDD6C9] p-8 w-full sm:w-full md:w-full lg:w-75">
        <div class="flex items-center justify-between mb-2">
            <baseHeaderSection :text="data?.title" css="mb-0" />
            <span
                class="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                :class="isActive ? 'bg-[#5A6349]/10 text-[#5A6349]' : 'bg-zinc-500/10 text-[#8A847C]'"
            >
                {{ isActive ? 'Active' : 'Paused' }}
            </span>
        </div>

        <div class="flex flex-col gap-6">
            <div class="text-md font-bold tabular-nums">
                Campaign for <span class="text-[#B5563A]">{{ data?.targetStatus }}</span> leads
            </div>

            <div class="text-xs text-[#8A847C] -mt-4">
                {{ cadenceLabel }} &middot; {{ dayLabel }}
            </div>

            <p class="text-md font-bold tabular-nums">{{ data?.subject }}</p>

            <div class="flex flex-col gap-3">
                <UButton
                    :label="isActive ? 'Pause Campaign' : 'Resume Campaign'"
                    :loading="toggling"
                    color="neutral"
                    variant="subtle"
                    @click="useToggle"
                />

                <UModal :title="`Delete ${data?.title} Campaign?`" v-model:open="open">
                    <UButton label="Delete Campaign" color="error" variant="subtle" class="w-full justify-center" />

                    <template #body>
                        <baseButtonDelete label="Delete" @click="useDelete" />
                    </template>
                </UModal>
            </div>
        </div>
    </div>
</template>
