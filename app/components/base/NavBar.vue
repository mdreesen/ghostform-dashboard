<script setup lang="ts">

const route = useRoute()

/** Live counts beside the labels — "3 overdue" without opening the page. */
const { data: briefing } = useNuxtData<any>('briefing')
const { data: leads } = useNuxtData<any>('leads')
const { data: user } = useNuxtData('user');

const overdue = computed(() => briefing.value?.totals?.overdue ?? 0)
const peopleCount = computed(() => (leads.value ?? []).length || 0)

const groups = computed(() => [
  {
    label: 'Work',
    items: [
      { label: 'Today', to: '/dashboard', badge: overdue.value, alert: overdue.value > 0 },
      { label: 'People', to: '/dashboard/leads', badge: peopleCount.value },
      { label: 'Properties', to: '/dashboard/home' }
    ]
  },
  {
    label: 'Reach out',
    items: [
      { label: 'Campaigns', to: '/dashboard/campaigns' },
      { label: 'Social', to: '/dashboard/social' },
      { label: 'Forms & QR codes', to: '/dashboard/forms' }
    ]
  }
])

/** Exact match for the dashboard root, prefix match for everything else —
 *  otherwise "Today" stays highlighted on every page. */
function isCurrent(to: string): boolean {
  return to === '/dashboard' ? route.path === '/dashboard' : route.path.startsWith(to)
}

// Bottom tabs: the four daily destinations. The rest live under More.
const MORE = ['/dashboard/campaigns', '/dashboard/social', '/dashboard/forms', '/dashboard/profile']
const moreOpen = ref(false)
const moreActive = computed(() => MORE.some((p) => route.path.startsWith(p)))
watch(() => route.path, () => { moreOpen.value = false })
</script>

<template>
  <div>
    <!-- ── Desktop sidebar ───────────────────────────────────── -->
    <nav class="nav-side" aria-label="Main">
      <NuxtLink to="/dashboard" class="nav-mark">GhostForm</NuxtLink>

      <div v-for="g in groups" :key="g.label" class="nav-group">
        <p class="nav-group-label">{{ g.label }}</p>
        <NuxtLink v-for="i in g.items" :key="i.to" :to="i.to" class="nav-item"
          :aria-current="isCurrent(i.to) ? 'page' : undefined">
          {{ i.label }}
          <span v-if="i.badge" class="nav-badge" :data-alert="i.alert || undefined">{{ i.badge }}</span>
        </NuxtLink>
      </div>

      <div class="nav-group" style="margin-top:auto">
        <NuxtLink to="/dashboard/profile" class="nav-item"
          :aria-current="isCurrent('/dashboard/profile') ? 'page' : undefined">
          <img v-if="user?.headshot_url" :src="user?.headshot_url" :alt="user?.name"
            class="w-11 h-11 rounded-full object-cover shrink-0" />
          Profile &amp; settings
        </NuxtLink>
      </div>
    </nav>

    <!-- ── Mobile bottom tabs ────────────────────────────────── -->
    <nav class="nav-tabs" aria-label="Main">
      <NuxtLink to="/dashboard" class="nav-tab" :aria-current="isCurrent('/dashboard') ? 'page' : undefined">
        <span v-if="overdue > 0" class="nav-tab-dot"></span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
        Today
      </NuxtLink>

      <NuxtLink to="/dashboard/leads" class="nav-tab"
        :aria-current="isCurrent('/dashboard/leads') ? 'page' : undefined">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round">
          <path d="M16 20v-2a4 4 0 0 0-8 0v2" />
          <circle cx="12" cy="8" r="4" />
        </svg>
        People
      </NuxtLink>

      <NuxtLink to="/dashboard/home" class="nav-tab" :aria-current="isCurrent('/dashboard/home') ? 'page' : undefined">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
        Properties
      </NuxtLink>

      <button class="nav-tab" type="button" :aria-current="moreActive ? 'page' : undefined" :aria-expanded="moreOpen"
        @click="moreOpen = !moreOpen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
        More
      </button>
    </nav>

    <!-- More sheet. Weekly tasks, not daily — so they're one tap deeper. -->
    <Teleport to="body">
      <div v-if="moreOpen" class="fixed inset-0 z-[59]" style="background:rgba(31,27,22,.4)" @click="moreOpen = false">
        <div class="fixed left-0 right-0"
          style="bottom:calc(56px + env(safe-area-inset-bottom, 0px));background:#F7F4EF;border-top:1px solid #DDD6C9"
          @click.stop>
          <NuxtLink to="/dashboard/campaigns" class="nav-item" style="padding:16px 20px">Campaigns</NuxtLink>
          <NuxtLink to="/dashboard/social" class="nav-item" style="padding:16px 20px">Social</NuxtLink>
          <NuxtLink to="/dashboard/forms" class="nav-item" style="padding:16px 20px">Forms &amp; QR codes</NuxtLink>
          <NuxtLink to="/dashboard/profile" class="nav-item" style="padding:16px 20px">Profile &amp; settings</NuxtLink>
        </div>
      </div>
    </Teleport>
  </div>
</template>
