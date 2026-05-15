// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    'nuxt-auth-utils',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    'nuxt-vitalizer',
    'nuxt-google-auth',
    'nuxt-notify',
    'nuxt-qrcode',
    '@vite-pwa/nuxt'
  ],

  googleAuth: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    autoLoadScript: true,         // load Google script automatically
    promptOneTap: true,           // show One Tap prompt
    enableServerVerify: true      // enable server-side token verification endpoint
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
    theme: "system",
    showIcon: true,
  },
  qrcode: {
    options: {
      variant: 'circle',
      // OR
      // variant: {
      //   inner: 'circle',
      //   marker: 'rounded',
      //   pixel: 'rounded',
      // },
      radius: 1,
      blackColor: 'currentColor',
      whiteColor: 'transparent',
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        'vue-chrts',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'date-fns',
        'lucide-vue-next',
        'vue-qrcode-reader',
        '@tanstack/vue-table',
        'nuxt-notify'
      ]
    }
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
        // {
        //   src: '/images/logo_transparent_512x512.webp',
        //   sizes: '512x512',
        //   type: 'image/webp',
        // },
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
    workbox: {
      'navigateFallback': '/login',
      globPatterns: ['**/*.{js,css,html,svg,webp,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
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