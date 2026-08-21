<script setup lang="ts">
definePageMeta({ layout: 'authenticated' });

useHead({
  title: 'GhostForm | Social posts',
  meta: [{ name: 'description', content: 'Post drafts written in your voice.' }],
});

type Platform = 'facebook' | 'instagram' | 'x';

const { data: user } = useNuxtData<any>('user');
const { fetch: refreshSession } = useUserSession();
const toast = useToast();

const platform = ref<Platform>('facebook');
const topic = ref('open_house');
const details = ref('');
const generating = ref(false);
const drafts = ref<any[]>([]);
const source = ref<'ai' | 'template' | null>(null);
const savingId = ref<string | null>(null);
const copiedIdx = ref<number | null>(null);
const open = ref(false);
const loading = ref(false);

const { data: queue, refresh: refreshQueue } = await useFetch<any>('/api/social', {
  key: 'social', lazy: true
});

const topics = [
  { value: 'open_house', label: 'Open house this weekend' },
  { value: 'just_listed', label: 'New listing' },
  { value: 'just_sold', label: 'Just sold / closed' },
  { value: 'market_note', label: 'Local market note' },
  { value: 'tip', label: 'Advice for buyers or sellers' },
  { value: 'personal', label: 'Something personal / local' },
  { value: 'testimonial', label: 'Client thank-you' },
];

const platforms: { value: Platform; label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'x', label: 'X' },
];

// Has the realtor told us how they talk? Without this, posts are generic.
const voiceSet = computed(() => {
  const v = user.value?.voice;
  return Boolean(v?.about || v?.samples || v?.focus);
});

async function generate() {
  generating.value = true;
  drafts.value = [];
  try {
    const res = await $fetch<any>('/api/social/generate', {
      method: 'POST',
      body: {
        platform: platform.value,
        topic: topic.value,
        details: details.value || undefined,
        count: 3
      }
    });
    drafts.value = res.posts.map((p: any) => ({ ...p, edited: p.body }));
    source.value = res.source;
  } catch {
    toast.error('Could not generate posts. Please try again.');
  } finally {
    generating.value = false;
  }
}

function fullText(p: any) {
  return [p.edited ?? p.body, p.hashtags].filter(Boolean).join('\n\n');
}

async function copy(p: any, idx: number) {
  try {
    await navigator.clipboard.writeText(fullText(p));
    copiedIdx.value = idx;
    setTimeout(() => (copiedIdx.value = null), 1800);
  } catch {
    toast.error('Could not copy.');
  }
}

async function approve(p: any) {
  try {
    await $fetch('/api/social/save', {
      method: 'POST',
      body: {
        platform: platform.value,
        topic: topic.value,
        body: p.edited ?? p.body,
        hashtags: p.hashtags,
        imageIdea: p.imageIdea,
        status: 'approved'
      }
    });
    toast.success('Saved to your queue');
    await refreshQueue();
  } catch {
    toast.error('Could not save.');
  }
}

async function setStatus(post: any, status: string) {
  savingId.value = post._id;
  try {
    await $fetch('/api/social/status', { method: 'POST', body: { _id: post._id, status } });
    await refreshQueue();
  } catch {
    toast.error('Could not update.');
  } finally {
    savingId.value = null;
  }
}

/**
 * Where "share" actually goes.
 * X has a real web composer we can prefill. Facebook's sharer only takes a URL,
 * not text, and Instagram has no web composer at all — so for those we copy the
 * text and open the app, which is genuinely the fastest path available.
 */
async function share(post: any) {
  const text = [post.body, post.hashtags].filter(Boolean).join('\n\n');

  if (post.platform === 'x') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    return;
  }

  try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
  toast.success('Copied — paste it into the app');
  window.open(
    post.platform === 'instagram' ? 'https://www.instagram.com/' : 'https://www.facebook.com/',
    '_blank'
  );
};

const useDelete = async (post) => {
  loading.value = true

  try {
    await $fetch('/api/social', {
      method: 'DELETE',
      body: post
    })
    await refreshSession();
    await refreshNuxtData('social');
    toast.success('Deleted social');
    open.value = false;

  } catch (error) {
    toast.error('Failed to delete');
  } finally {
    loading.value = false
  }
};
</script>

<template>
  <div class="max-w-[1100px] mx-auto">

    <!-- Head -->
    <header class="mb-16 pt-4">
      <p class="gf-eyebrow mb-5 gf-rise" style="--d:.05s">Social</p>
      <h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="--d:.12s">
        Posts written the way you talk.
      </h1>
      <p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[50ch] gf-rise" style="--d:.2s">
        Pick what you want to post about. Edit anything that doesn't sound like you,
        then copy it across.
      </p>
    </header>

    <!-- Voice nudge -->
    <section v-if="!voiceSet" class="gf-depth mb-16">
      <div
        class="bg-[#EFEAE0] border border-[#DDD6C9] p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div>
          <p class="font-display text-[18px] font-semibold mb-1.5">Tell it how you talk first</p>
          <p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[52ch]">
            Two minutes of setup is the difference between posts that sound like you and
            posts that sound like every other agent's feed.
          </p>
        </div>
        <NuxtLink to="/dashboard/profile#voice"
          class="shrink-0 px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors text-center">
          Set up my voice
        </NuxtLink>
      </div>
    </section>

    <!-- 01 Write -->
    <section class="gf-depth mb-20">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">01 — Write</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">What's this about?</span>
      </div>

      <div class="grid lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label class="gf-eyebrow block mb-3">Where it's going</label>
          <div class="flex gap-2">
            <button v-for="p in platforms" :key="p.value"
              class="flex-1 py-3 text-[11px] uppercase tracking-[0.1em] border transition-colors" :class="platform === p.value
                ? 'bg-[#B5563A]/10 border-[#B5563A] text-[#B5563A]'
                : 'border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'" @click="platform = p.value">
              {{ p.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="gf-eyebrow block mb-3">Topic</label>
          <select v-model="topic"
            class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A] transition-colors">
            <option v-for="t in topics" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </div>

        <div>
          <label class="gf-eyebrow block mb-3">Anything specific? (optional)</label>
          <input v-model="details" placeholder="Saturday 11–1, the cabin on Whitefish Stage"
            class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A] transition-colors" />
        </div>
      </div>

      <button :disabled="generating"
        class="px-7 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40"
        @click="generate">
        {{ generating ? 'Writing…' : 'Write me 3 posts' }}
      </button>

      <!-- Drafts -->
      <div v-if="drafts.length" class="mt-10 space-y-5">
        <p v-if="source === 'template'" class="text-[12.5px] text-[#A9A39A]">
          Written from a template — add an AI key for posts tailored to your voice.
        </p>

        <div v-for="(d, i) in drafts" :key="i" class="border border-[#DDD6C9] bg-[#EFEAE0] p-6">
          <textarea v-model="d.edited" :rows="platform === 'x' ? 3 : 6"
            class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[15px] leading-relaxed resize-none focus:outline-none focus:border-[#B5563A]" />

          <div class="flex flex-wrap items-center justify-between gap-4 mt-3">
            <div class="text-[12px] text-[#A9A39A] space-y-1">
              <p v-if="d.hashtags">{{ d.hashtags }}</p>
              <p v-if="d.imageIdea">Photo: {{ d.imageIdea }}</p>
              <p v-if="platform === 'x'" :class="(d.edited?.length ?? 0) > 260 ? 'text-[#B5563A]' : ''">
                {{ d.edited?.length ?? 0 }} / 260 characters
              </p>
            </div>

            <div class="flex gap-2.5">
              <button
                class="px-5 py-2.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
                @click="copy(d, i)">
                {{ copiedIdx === i ? 'Copied' : 'Copy' }}
              </button>
              <button
                class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] transition-colors"
                @click="approve(d)">
                Keep it
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 Image -->
    <section class="gf-depth mb-20">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">02 — Image</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">Make something to post with it</span>
      </div>

      <p class="text-[14.5px] text-[#8A847C] leading-relaxed max-w-[62ch] mb-9">
        For listings and sold posts, use your own photos — nothing beats the real house.
        These are for the posts you can't photograph: market notes, advice, open house
        announcements.
      </p>

      <ClientOnly>
        <appSocialCard :agent-name="user?.name" :company="user?.company" :region="user?.region"
          :brand-color="user?.brand_color" :headshot-url="user?.headshot_url" :topic="topic"
          :saved-style="user?.cardStyle" />
      </ClientOnly>
    </section>

    <!-- 03 Queue -->
    <section class="gf-depth mb-20">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">03 — Ready</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">Approved and waiting</span>
        <span class="text-[13px] text-[#A9A39A] tabular-nums">{{ queue?.approved?.length ?? 0 }}</span>
      </div>

      <div v-if="queue?.approved?.length" class="space-y-4">
        <div v-for="post in queue.approved" :key="post._id"
          class="border border-[#DDD6C9] p-6 flex flex-col lg:flex-row lg:items-start gap-6 justify-between">
          <div class="min-w-0 flex-1">
            <p class="gf-eyebrow mb-2.5">{{ post.platform }}</p>
            <p class="text-[15px] leading-relaxed whitespace-pre-line">{{ post.body }}</p>
            <p v-if="post.hashtags" class="text-[13px] text-[#A9A39A] mt-2.5">{{ post.hashtags }}</p>
          </div>

          <div class="flex gap-2.5 shrink-0">
            <button
              class="px-5 py-2.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
              @click="share(post)">
              {{ post.platform === 'x' ? 'Open in X' : 'Copy & open' }}
            </button>
            <button :disabled="savingId === post._id"
              class="px-5 py-2.5 border border-[#5A6349] text-[11px] uppercase tracking-[0.1em] text-[#5A6349] hover:bg-[#5A6349] hover:text-[#F7F4EF] transition-colors disabled:opacity-40"
              @click="setStatus(post, 'posted')">
              Posted
            </button>

            <UModal :title="`Delete`" v-model:open="open">
              <UButton label="Delete Campaign" color="error" variant="subtle" class="px-5 py-2.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors" />

              <template #body>
                <div class="pb-6">Are you sure?</div>
                <baseButtonDelete label="Delete" @click="useDelete(post)" />
              </template>
            </UModal>
          </div>
        </div>
      </div>

      <div v-else class="border-t border-b border-[#DDD6C9] py-14 text-center">
        <p class="text-[14px] text-[#8A847C]">
          Nothing queued yet. Write a few above and keep the ones you like.
        </p>
      </div>
    </section>

    <!-- 04 History -->
    <section v-if="queue?.posted?.length" class="gf-depth">
      <div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8">
        <span class="gf-eyebrow">04 — History</span>
        <span class="font-display text-[25px] font-semibold tracking-tight">Already posted</span>
      </div>
      <div class="space-y-3">
        <div v-for="post in queue.posted" :key="post._id"
          class="border-t border-[#DDD6C9] pt-4 flex items-start gap-5 justify-between">
          <p class="text-[14px] text-[#8A847C] leading-relaxed line-clamp-2 flex-1">{{ post.body }}</p>
          <span class="text-[11px] uppercase tracking-[0.14em] text-[#A9A39A] shrink-0">
            {{ post.platform }}
          </span>
        </div>
      </div>
    </section>

  </div>
</template>
