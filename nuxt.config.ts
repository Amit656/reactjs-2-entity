// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE,
      WarehouseURL: process.env.WH_API_BASE,
      THREEPL_API_URL: process.env.THREEPL_API_URL,
      THREEPL_URL: process.env.THREEPL_URL,
    },
  },
  plugins: ['~/plugins/vue-multiselect'],
  css: ['~/assets/css/style.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";',
        },
      },
    },
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  headlessui: {
    prefix: 'Headless',
  },
  ssr: false,
});
