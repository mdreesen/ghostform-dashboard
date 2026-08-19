<script setup lang="ts">
/**
 * 3D topographic terrain — GhostForm's signature background.
 *
 * A rolling landscape of terracotta squares built from two overlapping wave
 * functions, projected with hand-rolled perspective (no 3D library, so it
 * adds zero bundle weight). Scroll steepens the tilt and pushes it into the
 * distance; pointer movement drifts it subtly.
 *
 * Performance notes:
 *  - The grid is stored in a 2D array so the render loop never does O(n²)
 *    lookups.
 *  - The RAF loop pauses when the canvas scrolls out of view, and on
 *    prefers-reduced-motion it draws a single static frame.
 *  - Grid density scales down on small screens.
 */
const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let io: IntersectionObserver | null = null

onMounted(() => {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx) return

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  let w = 0, h = 0, dpr = 1
  let t = 0, scrollT = 0, mx = 0, my = 0
  let visible = true

  // Fewer points on small screens keeps phones smooth.
  const small = window.innerWidth < 768
  const COLS = small ? 26 : 44
  const ROWS = small ? 18 : 28
  const SPACING = small ? 44 : 48
  const AMP = 34
  const FOCAL = 620
  const BASE_Z = 700

  function size() {
    if (!c || !ctx) return
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    const r = c.getBoundingClientRect()
    w = r.width; h = r.height
    c.width = w * dpr; c.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function project(x: number, y: number, z: number) {
    const s = FOCAL / (FOCAL + z)
    return { x: w * 0.62 + x * s, y: h * 0.46 + y * s, s }
  }

  function frame() {
    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    t += 0.006

    const tilt = 0.52 + scrollT * 0.30 + my * 0.10
    const sinT = Math.sin(tilt), cosT = Math.cos(tilt)
    const depthPush = scrollT * 420

    const grid: (({ x: number; y: number; s: number; wy: number }) | null)[][] = []
    for (let gz = 0; gz < ROWS; gz++) {
      const row: (({ x: number; y: number; s: number; wy: number }) | null)[] = []
      for (let gx = 0; gx < COLS; gx++) {
        const wx = (gx - COLS / 2) * SPACING + mx * 30
        const wz = (gz - ROWS / 2) * SPACING
        const wy = Math.sin(gx * 0.42 + t * 1.1) * AMP
                 + Math.cos(gz * 0.35 - t * 0.8) * AMP * 0.75
        const ry = wy * cosT - wz * sinT
        const rz = wy * sinT + wz * cosT + BASE_Z + depthPush
        if (rz <= -FOCAL + 60) { row.push(null); continue }
        const p = project(wx, ry, rz)
        row.push({ ...p, wy })
      }
      grid.push(row)
    }

    ctx.lineWidth = 1

    // contour lines across
    ctx.strokeStyle = 'rgba(181,86,58,0.15)'
    for (let gz = 0; gz < ROWS; gz++) {
      ctx.beginPath(); let started = false
      for (let gx = 0; gx < COLS; gx++) {
        const p = grid[gz]![gx]; if (!p) { started = false; continue }
        if (!started) { ctx.moveTo(p.x, p.y); started = true } else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
    }
    // and into the distance
    ctx.strokeStyle = 'rgba(181,86,58,0.08)'
    for (let gx = 0; gx < COLS; gx += 2) {
      ctx.beginPath(); let started = false
      for (let gz = 0; gz < ROWS; gz++) {
        const p = grid[gz]![gx]; if (!p) { started = false; continue }
        if (!started) { ctx.moveTo(p.x, p.y); started = true } else ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
    }

    // the squares
    for (let gz = 0; gz < ROWS; gz++) {
      for (let gx = 0; gx < COLS; gx++) {
        const p = grid[gz]![gx]; if (!p) continue
        const sz = Math.max(1.1, 6.5 * p.s)
        const fade = Math.max(0, Math.min(1, p.s * 1.6))
        const lift = (p.wy + AMP * 1.75) / (AMP * 3.5)
        ctx.fillStyle = `rgba(181,86,58,${(0.12 + lift * 0.68) * fade})`
        ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz)
      }
    }

    if (!reduced && visible) raf = requestAnimationFrame(frame)
  }

  const onScroll = () => {
    const host = c.parentElement
    scrollT = Math.min(1, Math.max(0, window.scrollY / (host?.offsetHeight || 800)))
  }
  const onMove = (e: MouseEvent) => {
    mx = e.clientX / window.innerWidth - 0.5
    my = e.clientY / window.innerHeight - 0.5
  }

  window.addEventListener('resize', size)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMove, { passive: true })

  // Pause the loop entirely when the hero isn't on screen.
  io = new IntersectionObserver((entries) => {
    const wasVisible = visible
    visible = entries[0]?.isIntersecting ?? true
    if (visible && !wasVisible && !reduced) raf = requestAnimationFrame(frame)
  }, { threshold: 0 })
  io.observe(c)

  size()
  frame()

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf)
    io?.disconnect()
    window.removeEventListener('resize', size)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('mousemove', onMove)
  })
})
</script>

<template>
  <canvas ref="canvas" class="gf-terrain" aria-hidden="true" />
</template>

<style scoped>
.gf-terrain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
  pointer-events: none;
}
</style>
