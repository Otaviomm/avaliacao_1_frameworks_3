<template>
  <v-container>
    <v-row v-if="jogo">
      <v-col cols="12" md="4">
        <v-img :src="jogo.imageUrl" class="rounded" aspect-ratio="3/4"></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h1 class="text-h2 text-primary mb-2" style="text-shadow: 0 0 5px #FCEE0A;">{{ jogo.title }}</h1>
        <h2 class="text-h5 text-secondary mb-4">{{ jogo.platform }}</h2>
        
        <v-divider class="my-4"></v-divider>

        <div class="d-flex align-center mb-4">
          <v-chip color="secondary" class="mr-4">Gênero: {{ jogo.genre }}</v-chip>
          <v-chip color="primary">Nota Metacritic: {{ jogo.score }}</v-chip>
        </div>

        <div v-if="jogo.notes" class="mt-4">
          <h3 class="text-h6 text-secondary">Anotações Pessoais:</h3>
          <p style="white-space: pre-wrap; opacity: 0.8;">{{ jogo.notes }}</p>
        </div>
        
        <v-btn to="/library" color="primary" variant="outlined" class="mt-6">
          <v-icon left>mdi-arrow-left</v-icon>
          Voltar para a Biblioteca
        </v-btn>
      </v-col>
    </v-row>
    
    <v-row v-else class="text-center mt-10">
      <v-col>
        <h1 class="text-h3 text-error">Jogo não encontrado</h1>
        <p>O jogo com este ID não existe na sua biblioteca.</p>
        <v-btn to="/library" color="primary" variant="outlined" class="mt-6">
          Voltar para a Biblioteca
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const jogo = ref(null)

onMounted(() => {
  const route = useRoute()
  const gameId = parseInt(route.params.id)

  const jogosSalvos = localStorage.getItem('cyberlib_jogos')
  if (jogosSalvos) {
    const todosOsJogos = JSON.parse(jogosSalvos)
    jogo.value = todosOsJogos.find(j => j.id === gameId)
  }
})
</script>