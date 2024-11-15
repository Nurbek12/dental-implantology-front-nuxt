// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  site: { indexable: true },
  modules: ['nuxt-open-fetch', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-delay-hydration'],
  ssr: false,
  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      {
        code: 'uz',
        file: 'uz.json',
      },
      {
        code: 'ru',
        file: 'ru.json',
      },
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    defaultLocale: 'ru',
    detectBrowserLanguage: false,
    skipSettingLocaleOnNavigate: true,
    langDir: './locales',
  },

  runtimeConfig: {
    public: {
      api_url: process.env.NUXT_API_URL
    }
  },

  sitemap: {
    exclude: ['/admin', '/admin/*', '/login']
  },

  robots: {
    allow: '/',
    disallow: '/admin/*',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: process.env.NODE_ENV === 'production' ? { 
        preset: ['default', { 
          discardComments: { removeAll: true } 
        }] 
      } : false as any
    },
  },

  sourcemap: {
    client: true,
    server: false
  },

  // delayHydration: {
  //   // enables nuxt-delay-hydration in dev mode for testing
  //   debug: process.env.NODE_ENV === 'development',
  //   mode: 'mount'
  // },

  routeRules: {
    '/**': {
      ssr: true,
    },
    '/login': {
      ssr: false,
    },
    '/admin/**': {
      ssr: false,
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'Dental Implantology | Стоматология в Самарканде',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [ 
        { name:'title', content:'Стоматология Dental Implantology - Ваш путь к здоровой улыбке'},
        { name:'description', content:'Профессиональная стоматология в Самарканде. Специализируемся на имплантологии, предлагаем высококачественные услуги по установке зубных имплантов. Запишитесь на консультацию сегодня!' },
        { name:'keywords', content:'стоматология Самарканд, имплантология, зубные импланты, стоматологические услуги, зубной врач, здоровье зубов, Dental Implantology, dr Ikramov, стоматологи я,имплантация зубов,имплантация зубы,имплантация зуб,стоматита лечение,отбеливание зубов,стоматологическая инструменты,стоматология самарканд,стоматологическая клиника,стоматология это,полости рта,дентал сервіс,импланты зуб,нервы зубов,протезирование зуб,детская стомат,детс стоматология,детские стоматология,инструменты стоматологии,стомат детская,микропротезирование зуба,лечение зубов,стоматология зубов' },
        { name: "author", content: "Dental Implantology" },
        { name: 'og:title', content: "Стоматология в Самарканде - Dental Implantology" },
        { name: 'og:description', content: "Профессиональная стоматология в Самарканде. Специализируемся на имплантологии, предлагаем высококачественные услуги по установке зубных имплантов. Запишитесь на консультацию сегодня!" },
        { name: 'og:image', content: "https://dr-ikramov.uz/favicon.ico" },
        { name: 'og:url', content: "https://dr-ikramov.uz" },
        { name: 'og:type', content: "website" },
        { name: 'og:site_name', content: "Dental Implantology" },
      ],
      link: [
        { rel: 'canonical', href: 'https://dr-ikramov.uz' },
        { rel: 'icon', type: 'image/x-icon', href: 'https://dr-ikramov.uz/favicon.ico' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Dental Implantology",
            "url": "https://dr-ikramov.uz",
            "description": "Профессиональная стоматология в Самарканде. Специализируемся на имплантологии, предлагаем высококачественные услуги по установке зубных имплантов. Запишитесь на консультацию сегодня!",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dahbed Street, 168А",
              "addressLocality": "Самарканд",
              "addressRegion": "Самарканд",
              "postalCode": "181307",
              "addressCountry": "Узбекистан"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+998915233344",
              "contactType": "customer service"
            }
          })
        }
      ],
    },
  },

  openFetch: {
    disableNuxtPlugin: true,
    clients: {
      api: {
        baseURL: process.env.NUXT_API_URL
      }
    }
  },

  compatibilityDate: '2024-07-30',
})