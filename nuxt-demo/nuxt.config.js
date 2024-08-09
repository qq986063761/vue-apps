// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  $production: {
    
  },
  $development: {
    
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0', // 让别人能访问我
  }
})
