// Arquivo: vite.config.js (CÓDIGO COMPLETO E CORRIGIDO)

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Importa o plugin do Vuetify
import vuetify from 'vite-plugin-vuetify'

// Importa as ferramentas para configurar o atalho '@'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    // Garante que o plugin do Vuetify está sendo chamado
    // A opção autoImport é a que importa os componentes automaticamente
    vuetify({ autoImport: true }),
  ],
  // Garante que o atalho '@' para a pasta 'src' funcione
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})