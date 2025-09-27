<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from './components/AppBar.vue'
</script>

<style>
/* Aplica a fonte Cyberpunk em toda a aplicação */
.v-application {
  font-family: 'Share Tech Mono', monospace;
}
</style>