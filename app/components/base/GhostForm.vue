<script setup lang="ts">
import { ghostFormUrl } from '~/utils/ghostFormUrl';

/**
 * Live preview of a capture form, embedded in an iframe.
 *
 * NOTE: this component previously pre-formatted each value into a query
 * fragment (`category=realtor`, `&company_email=...`) and then passed those
 * into ghostFormUrl(), which formats them again — producing a doubly-encoded,
 * broken URL. It also passed only four arguments, in the wrong positions, and
 * had no `id` prop, so the form could never identify the account.
 * It now passes raw values in the correct order.
 */
const props = defineProps({
    category: { type: String, required: true },
    /** the user's _id — required or the capture form can't attribute the lead */
    id: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    calendar: { type: String },
    /** which question set to preview: 'open_house' | 'on_market' | 'data_entry' */
    source: { type: String, default: 'data_entry' }
});

const ready = computed(() =>
    Boolean(props.category && props.id && props.company && props.email)
);

const src = computed(() =>
    ghostFormUrl(
        props.category,
        props.source,
        props.id,
        props.company,
        props.email,
        props.calendar || ''
    )
);
</script>

<template>
    <div class="max-w-md mx-auto w-full">
        <div class="bg-[#EFEAE0] border border-[#DDD6C9] overflow-hidden">
            <div v-if="!ready" class="py-10 px-6 text-center">
                <p class="text-[14px] text-[#8A847C]">
                    A category, account id, company name, and email are needed to preview this form.
                </p>
            </div>

            <iframe
                v-else
                :src="src"
                style="width: 100%; height: 500px; border: none; background: transparent;"
                scrolling="no"
            />
        </div>
    </div>
</template>
