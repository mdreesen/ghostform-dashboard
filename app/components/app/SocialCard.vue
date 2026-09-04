<script setup lang="ts">
/**
 * Branded social card generator.
 *
 * Draws a graphic from the realtor's branding plus text THEY typed, then exports
 * a PNG. Rendered on a canvas in the browser — no image API, no server cost.
 *
 * Why drawn rather than AI-generated: a generated picture of a house in a
 * listing post is misleading advertising, and generated people imply who a
 * property is "for" (a fair-housing problem). A card can only show what the
 * agent typed, so it can't misrepresent anything.
 *
 * Preview is real DOM (crisp, easy to restyle); export redraws the same design
 * on canvas at the chosen output size.
 */

interface Props {
  agentName?: string
  company?: string
  region?: string
  brandColor?: string
  headshotUrl?: string
  topic?: string
  savedStyle?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  agentName: '', company: '', region: '',
  brandColor: '#B5563A', headshotUrl: '', topic: 'open_house',
  savedStyle: () => ({})
})

const toast = useToast()
const downloading = ref(false)
const savingStyle = ref(false)

type Template = 'event' | 'stat' | 'quote'
type Ratio = 'square' | 'story' | 'landscape'

const RATIOS: Record<Ratio, { w: number; h: number; label: string; note: string }> = {
  square:    { w: 1080, h: 1080, label: 'Square',    note: 'Instagram / Facebook feed' },
  story:     { w: 1080, h: 1920, label: 'Story',     note: 'Instagram / Facebook stories' },
  landscape: { w: 1200, h: 630,  label: 'Landscape', note: 'Facebook link posts' }
}

const templateForTopic: Record<string, Template> = {
  open_house: 'event', just_listed: 'event', just_sold: 'quote',
  market_note: 'stat', tip: 'quote', personal: 'quote', testimonial: 'quote'
}

const template = ref<Template>(templateForTopic[props.topic] || 'quote')
watch(() => props.topic, (t) => { template.value = templateForTopic[t] || 'quote' })

// ---- Style state (seeded from whatever they saved last) ----
const style = reactive({
  theme: props.savedStyle?.theme ?? 'light',
  bg: props.savedStyle?.bg ?? '#F7F4EF',
  fg: props.savedStyle?.fg ?? '#1F1B16',
  accent: props.savedStyle?.accent ?? props.brandColor ?? '#B5563A',
  showAvatar: props.savedStyle?.showAvatar ?? true,
  showBar: props.savedStyle?.showBar ?? true,
  ratio: (props.savedStyle?.ratio ?? 'square') as Ratio
})

const THEMES: Record<string, { bg: string; fg: string; label: string }> = {
  light:  { bg: '#F7F4EF', fg: '#1F1B16', label: 'Paper' },
  dark:   { bg: '#1F1B16', fg: '#F7F4EF', label: 'Ink' },
  accent: { bg: '',        fg: '#F7F4EF', label: 'Colour' }   // bg = accent
}

function applyTheme(name: string) {
  style.theme = name
  if (name === 'light') { style.bg = '#F7F4EF'; style.fg = '#1F1B16' }
  if (name === 'dark')  { style.bg = '#1F1B16'; style.fg = '#F7F4EF' }
  if (name === 'accent') { style.bg = style.accent; style.fg = '#F7F4EF' }
}
// Keep the "Colour" theme in sync when the accent changes.
watch(() => style.accent, (a) => { if (style.theme === 'accent') style.bg = a })

const isHex = (c: string) => /^#[0-9A-Fa-f]{6}$/.test(c)

/** Resolved colours, guarded so a half-typed hex can't break rendering. */
const palette = computed(() => {
  const bg = isHex(style.bg) ? style.bg : '#F7F4EF'
  const fg = isHex(style.fg) ? style.fg : '#1F1B16'
  const accent = isHex(style.accent) ? style.accent : '#B5563A'
  // Muted text = the foreground at reduced opacity, so it works on any bg.
  const muted = fg === '#1F1B16' ? '#8A847C' : 'rgba(247,244,239,0.68)'
  // On a coloured background the accent bar would vanish, so drop it.
  const barVisible = style.showBar && bg.toLowerCase() !== accent.toLowerCase()
  return { bg, fg, accent, muted, barVisible }
})

const fields = reactive({
  eyebrow: 'Open House',
  headline: 'Saturday\n11–1',
  sub: '',
  statNumber: '41',
  statLabel: 'median days on market',
  quote: ''
})

const initials = computed(() =>
  (props.agentName || props.company || 'GF')
    .split(/\s+/).filter(Boolean).slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '').join('')
)

const footSub = computed(() => [props.company, props.region].filter(Boolean).join(' · '))

/** Canvas has no wrapping — measure and break to a pixel width. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const out: string[] = []
  for (const paragraph of text.split('\n')) {
    if (!paragraph.trim()) { out.push(''); continue }
    let line = ''
    for (const word of paragraph.split(' ')) {
      const test = line ? `${line} ${word}` : word
      if (ctx.measureText(test).width > maxWidth && line) { out.push(line); line = word }
      else line = test
    }
    if (line) out.push(line)
  }
  return out
}

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!url) return resolve(null)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

async function download() {
  downloading.value = true
  try {
    const { w: W, h: H } = RATIOS[style.ratio]
    // Scale type with the canvas so story/landscape don't look wrong.
    const k = Math.min(W, H) / 1080
    const PAD = Math.round(100 * k)

    const canvas = document.createElement('canvas')
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('no canvas context')

    const p = palette.value
    ctx.fillStyle = p.bg
    ctx.fillRect(0, 0, W, H)

    if (p.barVisible) {
      ctx.fillStyle = p.accent
      ctx.fillRect(0, 0, W, Math.round(16 * k))
    }

    // Eyebrow
    ctx.fillStyle = style.theme === 'light' ? '#5A6349' : p.muted
    ctx.font = `600 ${Math.round(26 * k)}px Inter, system-ui, sans-serif`
    ctx.letterSpacing = `${Math.round(4 * k)}px`
    ctx.fillText(fields.eyebrow.toUpperCase(), PAD, PAD + Math.round(60 * k))
    ctx.letterSpacing = '0px'

    // Vertically centre the body block for taller ratios.
    const midY = H * (style.ratio === 'story' ? 0.44 : 0.46)

    if (template.value === 'stat') {
      ctx.fillStyle = p.fg
      ctx.font = `600 ${Math.round(230 * k)}px Fraunces, Georgia, serif`
      ctx.fillText(fields.statNumber || '—', PAD, midY)

      ctx.font = `400 ${Math.round(42 * k)}px Inter, system-ui, sans-serif`
      const lines = wrapText(ctx, fields.statLabel || '', W - PAD * 2)
      lines.slice(0, 2).forEach((l, i) => ctx.fillText(l, PAD, midY + Math.round(80 * k) + i * Math.round(54 * k)))

      if (fields.sub) {
        ctx.fillStyle = p.muted
        ctx.font = `400 ${Math.round(34 * k)}px Inter, system-ui, sans-serif`
        wrapText(ctx, fields.sub, W - PAD * 2).slice(0, 2).forEach((l, i) =>
          ctx.fillText(l, PAD, midY + Math.round(80 * k) + lines.length * Math.round(54 * k) + Math.round(20 * k) + i * Math.round(44 * k)))
      }
    } else if (template.value === 'quote') {
      ctx.fillStyle = p.fg
      const fs = Math.round(76 * k)
      ctx.font = `600 ${fs}px Fraunces, Georgia, serif`
      const lines = wrapText(ctx, fields.quote || fields.headline || '', W - PAD * 2)
      const lh = Math.round(92 * k)
      const startY = midY - Math.min(lines.length, 6) * (lh / 2) + lh / 2
      lines.slice(0, 6).forEach((l, i) => ctx.fillText(l, PAD, startY + i * lh))
    } else {
      ctx.fillStyle = p.fg
      ctx.font = `600 ${Math.round(110 * k)}px Fraunces, Georgia, serif`
      const lines = wrapText(ctx, fields.headline || '', W - PAD * 2)
      const lh = Math.round(118 * k)
      lines.slice(0, 3).forEach((l, i) => ctx.fillText(l, PAD, midY + i * lh))

      if (fields.sub) {
        ctx.fillStyle = p.muted
        ctx.font = `400 ${Math.round(40 * k)}px Inter, system-ui, sans-serif`
        wrapText(ctx, fields.sub, W - PAD * 2).slice(0, 3).forEach((l, i) =>
          ctx.fillText(l, PAD, midY + lines.length * lh + Math.round(20 * k) + i * Math.round(52 * k)))
      }
    }

    // Footer
    const AV = Math.round(96 * k)
    const avY = H - PAD - AV
    let textX = PAD

    if (style.showAvatar) {
      const img = await loadImage(props.headshotUrl)
      ctx.save()
      ctx.beginPath()
      ctx.arc(PAD + AV / 2, avY + AV / 2, AV / 2, 0, Math.PI * 2)
      ctx.closePath(); ctx.clip()
      if (img) {
        ctx.drawImage(img, PAD, avY, AV, AV)
      } else {
        ctx.fillStyle = p.accent
        ctx.fillRect(PAD, avY, AV, AV)
        ctx.fillStyle = '#F7F4EF'
        ctx.font = `600 ${Math.round(38 * k)}px Fraunces, Georgia, serif`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(initials.value, PAD + AV / 2, avY + AV / 2 + 2)
        ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
      }
      ctx.restore()
      textX = PAD + AV + Math.round(28 * k)
    }

    ctx.fillStyle = p.fg
    ctx.font = `600 ${Math.round(34 * k)}px Inter, system-ui, sans-serif`
    ctx.fillText(props.agentName || props.company || '', textX, avY + Math.round(42 * k))

    if (footSub.value) {
      ctx.fillStyle = p.muted
      ctx.font = `500 ${Math.round(24 * k)}px Inter, system-ui, sans-serif`
      ctx.letterSpacing = `${Math.round(2 * k)}px`
      ctx.fillText(footSub.value.toUpperCase(), textX, avY + Math.round(82 * k))
      ctx.letterSpacing = '0px'
    }

    // A cross-origin headshot without CORS headers taints the canvas and
    // toDataURL throws. Uploading (rather than pasting a URL) avoids this.
    let url: string
    try {
      url = canvas.toDataURL('image/png')
    } catch {
      toast.add({ title: 'That headshot blocks downloads. Upload your photo on the profile page instead of pasting a link.', color: 'error', duration: 8000 })
      return
    }

    const a = document.createElement('a')
    a.href = url
    a.download = `ghostform-${template.value}-${style.ratio}.png`
    a.click()
  } catch {
    toast.add({ title: 'Could not create the image.', color: 'error', duration: 8000 })
  } finally {
    downloading.value = false
  }
}

async function saveStyle() {
  savingStyle.value = true
  try {
    await $fetch('/api/user/card-style', {
      method: 'POST',
      body: {
        theme: style.theme,
        bg: isHex(style.bg) ? style.bg : undefined,
        fg: isHex(style.fg) ? style.fg : undefined,
        accent: isHex(style.accent) ? style.accent : undefined,
        showAvatar: style.showAvatar,
        showBar: style.showBar,
        ratio: style.ratio
      }
    })
    await refreshNuxtData('user')
    toast.add({ title: 'Saved — your next card will look like this.', color: 'success' })
  } catch {
    toast.add({ title: 'Could not save your style.', color: 'error', duration: 8000 })
  } finally {
    savingStyle.value = false
  }
}

// Preview scaling so story/landscape previews sit nicely in the column.
const previewAspect = computed(() => {
  const r = RATIOS[style.ratio]
  return `${r.w} / ${r.h}`
})
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-10 items-start">

    <!-- ── Controls ────────────────────────────────────────── -->
    <div>
      <!-- Template -->
      <p class="h-label mb-3">Card style</p>
      <div class="flex gap-2 mb-7">
        <button
          v-for="t in (['event','stat','quote'] as const)"
          :key="t"
          class="flex-1 py-3 text-[11px] uppercase tracking-[0.1em] border transition-colors"
          :class="template === t ? 'bg-[#4C5741]/10 border-[#4C5741] text-[#4C5741]' : 'border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
          @click="template = t"
        >
          {{ t === 'event' ? 'Event' : t === 'stat' ? 'Number' : 'Quote' }}
        </button>
      </div>

      <!-- Size -->
      <p class="h-label mb-3">Size</p>
      <div class="flex gap-2 mb-2">
        <button
          v-for="(r, key) in RATIOS"
          :key="key"
          class="flex-1 py-3 text-[11px] uppercase tracking-[0.1em] border transition-colors"
          :class="style.ratio === key ? 'bg-[#4C5741]/10 border-[#4C5741] text-[#4C5741]' : 'border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
          @click="style.ratio = key as Ratio"
        >
          {{ r.label }}
        </button>
      </div>
      <p class="text-[12px] text-[#A9A39A] mb-7">
        {{ RATIOS[style.ratio].note }} · {{ RATIOS[style.ratio].w }} × {{ RATIOS[style.ratio].h }}
      </p>

      <!-- Colours -->
      <p class="h-label mb-3">Colours</p>
      <div class="flex gap-2 mb-4">
        <button
          v-for="(t, key) in THEMES"
          :key="key"
          class="flex-1 py-3 text-[11px] uppercase tracking-[0.1em] border transition-colors"
          :class="style.theme === key ? 'bg-[#4C5741]/10 border-[#4C5741] text-[#4C5741]' : 'border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
          @click="applyTheme(key as string)"
        >
          {{ t.label }}
        </button>
        <button
          class="flex-1 py-3 text-[11px] uppercase tracking-[0.1em] border transition-colors"
          :class="style.theme === 'custom' ? 'bg-[#4C5741]/10 border-[#4C5741] text-[#4C5741]' : 'border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
          @click="style.theme = 'custom'"
        >
          Custom
        </button>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block text-[11px] text-[#A9A39A] mb-2">Accent</label>
          <div class="flex gap-2">
            <input v-model="style.accent" type="color" class="h-[42px] w-11 border border-[#DDD6C9] bg-[#F7F4EF] cursor-pointer" />
            <input v-model="style.accent" class="min-w-0 flex-1 bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-2.5 text-[13px] focus:outline-none focus:border-[#4C5741]" />
          </div>
        </div>
        <div>
          <label class="block text-[11px] text-[#A9A39A] mb-2">Background</label>
          <div class="flex gap-2">
            <input v-model="style.bg" type="color" class="h-[42px] w-11 border border-[#DDD6C9] bg-[#F7F4EF] cursor-pointer" @input="style.theme = 'custom'" />
            <input v-model="style.bg" class="min-w-0 flex-1 bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-2.5 text-[13px] focus:outline-none focus:border-[#4C5741]" @input="style.theme = 'custom'" />
          </div>
        </div>
        <div>
          <label class="block text-[11px] text-[#A9A39A] mb-2">Text</label>
          <div class="flex gap-2">
            <input v-model="style.fg" type="color" class="h-[42px] w-11 border border-[#DDD6C9] bg-[#F7F4EF] cursor-pointer" @input="style.theme = 'custom'" />
            <input v-model="style.fg" class="min-w-0 flex-1 bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-2.5 text-[13px] focus:outline-none focus:border-[#4C5741]" @input="style.theme = 'custom'" />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-6 mb-8">
        <label class="flex items-center gap-2.5 cursor-pointer text-[13px]">
          <input v-model="style.showAvatar" type="checkbox" class="accent-[#B5563A]" />
          Show my photo
        </label>
        <label class="flex items-center gap-2.5 cursor-pointer text-[13px]">
          <input v-model="style.showBar" type="checkbox" class="accent-[#B5563A]" />
          Top colour bar
        </label>
      </div>

      <!-- Content -->
      <p class="h-label mb-3">Wording</p>
      <div class="space-y-5">
        <div>
          <label class="block text-[11px] text-[#A9A39A] mb-2">Small label</label>
          <input v-model="fields.eyebrow" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#4C5741]" />
        </div>

        <template v-if="template === 'event'">
          <div>
            <label class="block text-[11px] text-[#A9A39A] mb-2">Big text</label>
            <textarea v-model="fields.headline" rows="2" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] resize-none focus:outline-none focus:border-[#4C5741]" />
          </div>
          <div>
            <label class="block text-[11px] text-[#A9A39A] mb-2">Address or detail</label>
            <textarea v-model="fields.sub" rows="2" placeholder="123 Whitefish Stage Rd&#10;City, State" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] resize-none focus:outline-none focus:border-[#4C5741]" />
          </div>
        </template>

        <template v-else-if="template === 'stat'">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-[11px] text-[#A9A39A] mb-2">Number</label>
              <input v-model="fields.statNumber" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#4C5741]" />
            </div>
            <div class="col-span-2">
              <label class="block text-[11px] text-[#A9A39A] mb-2">What it means</label>
              <input v-model="fields.statLabel" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#4C5741]" />
            </div>
          </div>
          <div>
            <label class="block text-[11px] text-[#A9A39A] mb-2">Context (optional)</label>
            <input v-model="fields.sub" placeholder="down from 58 last spring" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#4C5741]" />
          </div>
          <p class="text-[12px] text-[#A9A39A] leading-relaxed">
            Use a figure you can back up — from your MLS or local board, not memory.
          </p>
        </template>

        <template v-else>
          <div>
            <label class="block text-[11px] text-[#A9A39A] mb-2">The line</label>
            <textarea v-model="fields.quote" rows="4" placeholder="Get your financing sorted before you fall in love with a house." class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] leading-relaxed resize-none focus:outline-none focus:border-[#4C5741]" />
          </div>
        </template>
      </div>

      <div class="flex flex-wrap gap-3 mt-8">
        <button
          :disabled="downloading"
          class="px-7 py-3.5 bg-[#1F1B16] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:opacity-[0.86] transition-colors disabled:opacity-40"
          @click="download"
        >
          {{ downloading ? 'Making it…' : 'Download image' }}
        </button>
        <button
          :disabled="savingStyle"
          class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors disabled:opacity-40"
          @click="saveStyle"
        >
          {{ savingStyle ? 'Saving…' : 'Save this look' }}
        </button>
      </div>
    </div>

    <!-- ── Preview ─────────────────────────────────────────── -->
    <div class="lg:sticky lg:top-28">
      <p class="h-label mb-3">Preview</p>
      <div
        class="relative w-full max-w-[400px] mx-auto overflow-hidden flex flex-col justify-between border border-[#DDD6C9]"
        :style="{
          background: palette.bg,
          color: palette.fg,
          aspectRatio: previewAspect,
          padding: style.ratio === 'landscape' ? '28px 34px' : '36px'
        }"
      >
        <div v-if="palette.barVisible" class="absolute top-0 left-0 right-0 h-1.5" :style="{ background: palette.accent }" />

        <p class="text-[11px] font-semibold uppercase tracking-[0.18em]" :style="{ color: style.theme === 'light' ? '#5A6349' : palette.muted }">
          {{ fields.eyebrow }}
        </p>

        <div>
          <template v-if="template === 'stat'">
            <p class="font-display font-semibold leading-none tracking-tight" :class="style.ratio === 'landscape' ? 'text-[64px]' : 'text-[88px]'">
              {{ fields.statNumber || '—' }}
            </p>
            <p class="text-[16px] mt-2.5 leading-snug">{{ fields.statLabel }}</p>
            <p v-if="fields.sub" class="text-[13px] mt-1" :style="{ color: palette.muted }">{{ fields.sub }}</p>
          </template>

          <template v-else-if="template === 'quote'">
            <p class="font-display font-semibold leading-[1.22] tracking-tight whitespace-pre-line" :class="style.ratio === 'landscape' ? 'text-[24px]' : 'text-[29px]'">
              {{ fields.quote || 'Your line goes here.' }}
            </p>
          </template>

          <template v-else>
            <p class="font-display font-semibold leading-[1.05] tracking-tight whitespace-pre-line" :class="style.ratio === 'landscape' ? 'text-[34px]' : 'text-[42px]'">
              {{ fields.headline }}
            </p>
            <p v-if="fields.sub" class="text-[14px] mt-3 leading-snug whitespace-pre-line" :style="{ color: palette.muted }">
              {{ fields.sub }}
            </p>
          </template>
        </div>

        <div class="flex items-center gap-3">
          <template v-if="style.showAvatar">
            <img v-if="headshotUrl" :src="headshotUrl" :alt="agentName" class="w-11 h-11 rounded-full object-cover shrink-0" />
            <div v-else class="w-11 h-11 rounded-full flex items-center justify-center font-display text-[16px] font-semibold shrink-0"
              :style="{ background: palette.accent, color: '#F7F4EF' }">
              {{ initials }}
            </div>
          </template>
          <div class="min-w-0">
            <p class="text-[14px] font-semibold truncate">{{ agentName || company }}</p>
            <p class="text-[10.5px] uppercase tracking-[0.1em] truncate" :style="{ color: palette.muted }">{{ footSub }}</p>
          </div>
        </div>
      </div>

      <p v-if="!headshotUrl && style.showAvatar" class="text-[12px] text-[#A9A39A] mt-4 text-center max-w-[400px] mx-auto leading-relaxed">
        Using your initials — upload a photo on your profile to use that instead.
      </p>
    </div>
  </div>
</template>
