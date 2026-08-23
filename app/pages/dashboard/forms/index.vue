<script setup lang="ts">
import { ghostFormUrl } from '~/utils/ghostFormUrl';

definePageMeta({ layout: 'authenticated' });

useHead({
  title: 'GhostForm | Forms',
  meta: [{ name: 'description', content: 'Your lead capture forms and QR codes.' }],
});

const { data: user } = useNuxtData<any>('user');
const { data: home } = useNuxtData<any>('homes');

// Only active listings belong in the picker — attaching a new open house QR
// code to a sold house would mis-tag every lead it captures.
const activeHomes = computed(() =>
  (home.value ?? []).filter((h: any) => (h.status || 'active') !== 'sold')
);

const buildUrl = (source: string) =>
  ghostFormUrl(
    user.value?.category,
    source,
    user.value?._id,
    user.value?.company_hashed,
    user.value?.email_hashed,
    user.value?.calendar_link
  );

const formFunnels = computed(() => [
  {
    id: 'open-house',
    label: 'Open House Sign-In',
    description:
      'For the table by the door. Guests scan the QR code and sign in on their own phone — no clipboard, no handwriting to decipher later.',
    badge: 'QR code',
    source: 'open_house',
    icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    form_url: buildUrl('open_house'),
    data_home: activeHomes.value
  },
  {
    id: 'house-on-market',
    label: 'Listing Enquiry',
    description:
      'For a specific listing — put it on the sign, the flyer, or the listing page. Interested buyers leave their details and what they’re looking for.',
    badge: 'Public',
    source: 'on_market',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    form_url: buildUrl('on_market'),
    data_home: activeHomes.value
  },
  {
    id: 'data-entry',
    label: 'Quick Entry',
    description:
      'For you, not the lead. Add someone you met in person or spoke to on the phone, without typing out the whole record.',
    badge: 'Just for you',
    source: 'data_entry',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586A1 1 0 0114 3.414L18.586 8A1 1 0 0119 8.586V19a2 2 0 01-2 2z',
    form_url: buildUrl('data_entry')
  },
  {
    id: 'data-active',
    label: 'Active Entry',
    description:
      'To gather more defined information from the lead.',
    badge: 'Active lead',
    source: 'data_active',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586A1 1 0 0114 3.414L18.586 8A1 1 0 0119 8.586V19a2 2 0 01-2 2z',
    form_url: buildUrl('data_active')
  }
]);
</script>

<template>
  <div class="max-w-[1100px] mx-auto">

    <!-- ── Page head ─────────────────────────────────────────── -->
    <header class="mb-20 pt-4">
      <p class="gf-eyebrow mb-5 gf-rise" style="--d:.05s">Capture</p>

      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="--d:.12s">
            Three ways to collect a lead.
          </h1>
          <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[48ch] gf-rise" style="--d:.2s">
            Each one asks a different set of questions. Print the QR code, share the
            link, or use the quick entry form yourself — every lead lands in the same place.
          </p>
        </div>

        <div class="gf-rise shrink-0" style="--d:.28s">
          <baseButtonNavigate text="+ Create Lead" path="/dashboard/leads/create" />
        </div>
      </div>
    </header>

    <!-- ── The forms ─────────────────────────────────────────── -->
    <section v-for="(item, i) in formFunnels" :key="item.id" class="gf-depth mb-16" :style="`--d:${0.05 * i}s`">
      <div class="flex flex-wrap items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">{{ String(i + 1).padStart(2, '0') }} — Form</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">{{ item.label }}</span>
        <span class="text-[10.5px] uppercase tracking-[0.14em] text-[#A9A39A]">{{ item.badge }}</span>
      </div>

      <p class="text-[14.5px] text-[#8A847C] leading-relaxed max-w-[62ch] mb-8">
        {{ item.description }}
      </p>

      <div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7">
        <baseCardForm :label="item.label" :description="item.description" :icon="item.icon" :badge="item.badge"
          badgeClass="text-[#B5563A]" :qr_code_url="item.form_url" :data="item.data_home" />
      </div>
    </section>

  </div>
</template>
