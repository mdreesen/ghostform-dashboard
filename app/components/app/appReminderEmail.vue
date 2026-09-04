<script setup lang="ts">
const props = defineProps<{
    leadId: string
    currentStatus: string
}>()

const isSaving = ref(false)
const toast = useToast();

const updateSchedule = async (hoursOffset: number | null) => {
    isSaving.value = true

    let targetDate: string | null = null
    if (hoursOffset !== null) {
        const calc = new Date()
        calc.setHours(calc.getHours() + hoursOffset)
        targetDate = calc.toISOString()
    }

    try {
        await $fetch(`/api/leads/${props.leadId}/schedule`, {
            method: 'POST',
            body: { scheduledTime: targetDate }
        })

        toast.add({
            title: 'Queue Synchronized',
            description: hoursOffset ? 'Reminder target scheduled for execution.' : 'Automated follow-up cancelled.',
            color: 'success'
        });

        clearNuxtData('agent-pipeline-stream')
    } catch (error) {
        toast.add({ title: "Failed to update", description: 'Try again', color: 'error', duration: 8000 });
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div class="p-4 bg-[#F7F4EF]/50 border border-[#DDD6C9] space-y-3">
        <div class="flex justify-between items-center">
            <span class="text-xs text-[#8A847C] font-bold tracking-tight uppercase">Automation Flow Controls</span>
            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold"
                :class="props.currentStatus === 'scheduled' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-zinc-800 text-[#8A847C]'">
                Queue State: {{ props.currentStatus }}
            </span>
        </div>

        <div class="grid grid-cols-3 gap-2">
            <div>
                <baseButton text="+24 Hours" :loading="isSaving" @click="updateSchedule(24)" />
            </div>

            <div>
                <baseButton text="+48 Hours" :loading="isSaving" @click="updateSchedule(48)" />
            </div>

            <div>
                <baseButton text="Opt-Out Lead" :loading="isSaving" @click="updateSchedule(null)" />
            </div>
        </div>
    </div>
</template>