// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxtjs/i18n'],
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
    skipSettingLocaleOnNavigate: true,
    langDir: './languages',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  runtimeConfig: {
    public: {
      api_url: process.env.NUXT_API_URL
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
