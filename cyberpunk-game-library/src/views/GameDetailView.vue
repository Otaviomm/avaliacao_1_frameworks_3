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
        <h1 class="text-h3 text-warning">Carregando...</h1>
        <p>Buscando dados no servidor...</p>
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
import axios from 'axios' // <--- IMPORTANTE

const jogo = ref(null)

onMounted(async () => {
  const route = useRoute()
  // O ID vem como string da URL, mas o banco usa número (ou vice-versa dependendo do Supabase)
  const gameId = route.params.id 

  try {
    // Buscamos todos os jogos e filtramos o certo
    // (Idealmente o backend teria uma rota /games/:id, mas assim funciona sem mexer no backend)
    const response = await axios.get('http://localhost:3000/games')
    const todosOsJogos = response.data
    
    // Encontra o jogo pelo ID
    // Usamos '==' para comparar mesmo se um for string e outro numero
    jogo.value = todosOsJogos.find(j => j.id == gameId) 
  } catch (error) {
    console.error("Erro ao carregar detalhes:", error)
  }
})
</script>