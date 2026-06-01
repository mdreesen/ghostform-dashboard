// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    'nuxt-vitalizer',
    'nuxt-google-auth',
    'nuxt-notify',
    'nuxt-qrcode',
    '@vite-pwa/nuxt',
    'nuxt-charts',
  ],

  // Nitro wakes up and fires off task reminders
  nitro: {
    experimental: { tasks: true },
    tasks: {
      'lead:reminders': {
        handler: './server/tasks/lead/reminders', 
        description: 'Processes custom individual queues and recurring marketing blasts'
      }
    },
    scheduledTasks: {
      // Shifting '0 9 * * *' (Once a day) to '0 * * * *' (At minute 0 of every hour)
      '0 * * * *': ['lead:reminders']
    },
  },

  app: {
    head: {
      title: 'GhostForm', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    }
  },
  notify: {
    position: "top-right",
    duration: 5000,
    maxToasts: 5,
    theme: "dark",
    showIcon: true,
  },
  qrcode: {
    options: {
      variant: 'circle', // rounded, circle
      radius: 1,
      blackColor: 'currentColor',
      whiteColor: 'transparent',
    },
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'date-fns',
        'lucide-vue-next',
        'vue-qrcode-reader',
        '@tanstack/vue-table',
        'nuxt-notify',
        'zod',
        'workbox-window',
        'exceljs', // CJS
      ]
    },
  },

  typescript: {
    strict: false
  },
  colorMode: {
    dataValue: 'theme',
    classSuffix: '',
  },

  pwa: {
    /* PWA options */
    manifest: {
      name: 'GhostForm',
      short_name: 'GhostForm',
      description: 'Manifest your leads instantly.',
      orientation: 'natural',
      lang: 'en',
      display: 'standalone',
      background_color: '#020203',
      theme_color: '#020203',
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
          type: 'image/webp',
          purpose: "png"
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
      categories: [
        "realtor",
        "housing",
        "leads",
        "lead generation",
        "scheduling",
        "personalization"
      ],
      display_override: [
        "standalone",
        "window-controls-overlay"
      ],
      prefer_related_applications: true,
    },
    registerType: 'autoUpdate',
    workbox: {
      'navigateFallback': '/login',
      // Cache static routes and core UI structures
      globPatterns: ['**/*.{js,css,html,png,svg}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      // Enable Background Sync API for deferred network payloads
      runtimeCaching: [
        {
          // Intercepts your background synchronization endpoint
          urlPattern: /\/api\/leads\/sync/,
          handler: 'NetworkOnly',
          method: 'POST',
          options: {
            backgroundSync: {
              name: 'mongodb-sync-queue',
              options: {
                maxRetentionTime: 24 * 60 // Max retry duration in minutes (24 Hours)
              }
            }
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