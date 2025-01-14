export default defineNuxtConfig({
  css: ["~/assets/styles/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // server
    geminiApiKey: process.env.VITE_GEMINI_API_KEY || "",

    // client
    public: {
      geminiApiKey: process.env.VITE_GEMINI_API_KEY || "",
    },
  },

  modules: ["nuxt-lucide-icons"],
});
