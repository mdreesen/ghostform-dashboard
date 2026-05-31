<script setup lang="ts">
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
});

const toast = useToast();

const loading = ref(false);

const useDelete = async () => {
    loading.value = true

  try {
    await $fetch('/api/campaigns', {
      method: 'DELETE',
      body: props.data?._id
    })

    toast.success(
      'Automation Workflow Live',
      'Your recurring campaign criteria parameters have been saved.'
    )

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
                <baseButtonDelete label="Delete Campaign" />
            </div>
        </div>
    </div>
</template>