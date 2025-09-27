<template>
  <v-app-bar color="surface" density="compact">
    <v-app-bar-title class="cyber-title">
      <v-icon icon="mdi-controller-classic-outline" class="mr-2"></v-icon>
      CyberLibrary
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Gerenciar</v-btn>
    <v-btn to="/library" text>Biblioteca</v-btn>
    <v-btn to="/about" text>Sobre</v-btn>
  </v-app-bar>
</template>

<style scoped>
.cyber-title {
  color: #FCEE0A; /* Amarelo Cyberpunk */
  text-shadow: 0 0 5px #FCEE0A;
}
</style>