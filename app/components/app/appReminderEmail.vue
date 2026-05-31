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

        toast.success(
            'Queue Synchronized',
            hoursOffset ? `Reminder target scheduled for execution.` : 'Automated follow-up cancelled.',
        );

        clearNuxtData('agent-pipeline-stream')
    } catch (error) {
        toast.error("Failed to update", 'Try again');
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div class="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl space-y-3">
        <div class="flex justify-between items-center">
            <span class="text-xs text-zinc-400 font-bold tracking-tight uppercase">Automation Flow Controls</span>
            <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-black"
                :class="props.currentStatus === 'scheduled' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-zinc-800 text-zinc-500'">
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