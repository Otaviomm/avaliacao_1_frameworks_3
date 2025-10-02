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
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// ADICIONE ESTAS 3 NOVAS VARIÁVEIS
const termoBusca = ref('')
const ordenacao = ref('Nota (Maior para Menor)') // Valor padrão
const opcoesOrdenacao = ['Nota (Maior para Menor)', 'Título (A-Z)']
const jogosFiltrados = computed(() => {
  // Cria uma cópia da lista original para não modificá-la
  let jogosProcessados = [...jogos.value];

  // 1. Aplica o filtro de busca
  if (termoBusca.value) {
    jogosProcessados = jogosProcessados.filter(jogo =>
      jogo.title.toLowerCase().includes(termoBusca.value.toLowerCase())
    );
  }

  // 2. Aplica a ordenação
  if (ordenacao.value === 'Título (A-Z)') {
    jogosProcessados.sort((a, b) => a.title.localeCompare(b.title));
  } else if (ordenacao.value === 'Nota (Maior para Menor)') {
    jogosProcessados.sort((a, b) => b.score - a.score);
  }

  return jogosProcessados;
});
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