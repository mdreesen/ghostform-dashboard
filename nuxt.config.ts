// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/css/theme.css", "~/assets/css/system.css"],

  nitro: {
    /**
     * Nitro tasks are EXPERIMENTAL and must be enabled explicitly. Without
     * this, defineTask() files under server/tasks are never registered, and
     * runTask('lead:reminders') throws:
     *
     *   H3Error: Task `lead:reminders` is not available!
     *
     * The task file and vercel.json were both correct — only the flag was
     * missing, which is why it failed at run time rather than at build.
     */
    experimental: {
      tasks: true
    },

    /**
     * Prerender the app shell.
     *
     * The service worker uses `navigateFallback: '/'` so an offline navigation
     * with unknown query params still resolves. But `/` is server-rendered, so
     * it was never a file in the build output and never entered the precache
     * manifest — workbox threw:
     *
     *   Uncaught (in promise) non-precached-url: [{"url":"/"}]
     *
     * The fallback then did nothing, which quietly disabled offline loading.
     * Prerendering emits a real index.html for the manifest to reference.
     */
    prerender: {
      routes: ['/'],
      crawlLinks: false
    }
  },
  modules: [
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    'nuxt-auth-utils',
    'nuxt-qrcode',
    'nuxt-charts'
  ],
  app: {
    head: {
      title: 'GhostForm Dashboard', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  typescript: {
    strict: false
  },
  colorMode: {
    dataValue: 'theme',
    classSuffix: '', // Important for Tailwind CSS integration
  },

  pwa: {
    registerType: 'autoUpdate',
    // The module must NOT inject its own <link rel="manifest">. The layout
    // links a per-realtor manifest (server/routes/gf-manifest.webmanifest)
    // that carries the query params into start_url — two competing manifest
    // links would be resolved by document order, not by which one is correct.
    injectRegister: 'auto',
    includeManifestIcons: false,
    manifest: {
      name: 'GhostForm Lead Capture',
      short_name: 'GhostForm',
      description: 'Automated offline-capable lead generation and check-in portal',
      theme_color: '#09090B', // Matches your background_color layout variables
      background_color: '#09090B',
      display: 'standalone', // Essential for forcing native mobile-app view wrapper
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/images/maskable-icon.png',
          sizes: '445x445',
          type: 'image/png',
          purpose: "any"
        },
        {
          src: '/images/maskable-icon.png',
          sizes: '445x445',
          // Was image/webp on a .png file — a mismatched type can make a
          // browser skip the icon.
          type: 'image/png',
          // Was purpose: "png" — not a valid value. The spec allows only
          // any | maskable | monochrome, so browsers discarded this entry
          // entirely: "found icon with no valid purpose; ignoring it".
          purpose: "any"
        },
        {
          src: '/images/maskable-icon.png',
          sizes: '445x445',
          type: 'image/png',
          purpose: "maskable"
        },
        {
          src: '/images/maskable-icon.png',
          sizes: '445x445',
          type: 'image/png',
        }
      ],
    },
    workbox: {
      // Clean up outdated caches automatically across site iterations
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],

      // ── THE KEY TO OFFLINE LOADING ─────────────────────────────────
      // The form is always opened with unique query params, e.g.
      //   /?category=realtor&id=...&company_email=<hash>&...
      // Precached entries are keyed by full URL, so that request never
      // matches a cache entry and the page fails to open offline.
      // navigateFallback tells the service worker: for ANY navigation
      // request it can't otherwise satisfy, serve the cached app shell.
      // The query string is then read by the app as normal.
      navigateFallback: '/',
      // Never hijack API calls with the shell — they must fail honestly
      // so the offline queue can catch them.
      navigateFallbackDenylist: [/^\/api\//],

      runtimeCaching: [
        {
          // The document itself: serve from network when possible so config
          // changes land, but fall back to cache the moment signal drops.
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'ghostform-pages',
            networkTimeoutSeconds: 3,
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 }
          }
        },
        {
          // Fonts/images used by the form shell.
          urlPattern: ({ request }) =>
            ['style', 'script', 'font', 'image'].includes(request.destination),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'ghostform-assets',
            expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 60 }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    },
  },

  // @vueuse/motion/nuxt
  runtimeConfig: {
    // Server keys are read from process.env directly — see storage.ts and
    // documentRead.ts. Nothing private belongs here.
    public: {
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    }
  }
})