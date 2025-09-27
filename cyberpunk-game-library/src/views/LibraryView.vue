<template>
  <v-container>
    <h1 class="text-primary mb-4" style="text-shadow: 0 0 5px #FCEE0A;">Biblioteca de Jogos</h1>
    <v-row>
      <v-col v-for="jogo in jogos" :key="jogo.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="game-card">
          <v-img :src="jogo.imageUrl" height="250px" cover>
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
          <v-card-title>{{ jogo.title }}</v-card-title>
          <v-card-subtitle>{{ jogo.platform }}</v-card-subtitle>
          <v-card-text>
            <v-chip color="secondary" class="mr-2">{{ jogo.genre }}</v-chip>
            <v-chip color="primary">{{ jogo.score }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const jogos = ref([])
onMounted(() => {
  const jogosSalvos = localStorage.getItem('cyberlib_jogos')
  if (jogosSalvos) {
    jogos.value = JSON.parse(jogosSalvos)
  }
})
</script>

<style scoped>
.game-card {
  border: 1px solid #FCEE0A;
  transition: all 0.2s ease-in-out;
}
.game-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #FCEE0A;
}
</style>