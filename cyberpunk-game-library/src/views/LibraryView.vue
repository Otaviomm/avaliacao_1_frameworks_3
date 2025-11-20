<template>
  <v-container>
    <h1 class="text-primary mb-4" style="text-shadow: 0 0 5px #FCEE0A;">Biblioteca de Jogos</h1>

    <v-row class="mb-4">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="termoBusca"
          label="Buscar por título..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="ordenacao"
          label="Ordenar por"
          :items="opcoesOrdenacao"
          variant="outlined"
          density="compact"
          hide-details
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="jogo in jogosFiltrados" :key="jogo.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="game-card" :to="`/game/${jogo.id}`">
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
      <v-col v-if="jogosFiltrados.length === 0">
        <p class="text-center">Carregando biblioteca ou nenhum jogo encontrado...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios' // <--- IMPORTANTE

const termoBusca = ref('')
const ordenacao = ref('Nota (Maior para Menor)')
const opcoesOrdenacao = ['Nota (Maior para Menor)', 'Título (A-Z)']

const jogos = ref([])

const jogosFiltrados = computed(() => {
  let jogosProcessados = [...jogos.value];

  if (termoBusca.value) {
    jogosProcessados = jogosProcessados.filter(jogo =>
      jogo.title.toLowerCase().includes(termoBusca.value.toLowerCase())
    );
  }

  if (ordenacao.value === 'Título (A-Z)') {
    jogosProcessados.sort((a, b) => a.title.localeCompare(b.title));
  } else if (ordenacao.value === 'Nota (Maior para Menor)') {
    jogosProcessados.sort((a, b) => b.score - a.score);
  }

  return jogosProcessados;
});

// AQUI MUDOU: Busca do servidor em vez do localStorage
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/games')
    jogos.value = response.data
  } catch (error) {
    console.error("Erro ao carregar biblioteca:", error)
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