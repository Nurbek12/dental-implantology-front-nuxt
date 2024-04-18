// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
