<template>
  <v-container class="fill-height justify-center">
    <v-card class="pa-8 text-center" min-width="300">
      <h1 class="text-h4 mb-4 text-primary">CyberLibrary</h1>
      <p class="mb-6">Faça login para acessar o sistema</p>
      <v-btn color="primary" @click="handleLogin">
        Entrar com Google
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

function handleLogin() {
  authStore.loginGoogle()
}
</script>