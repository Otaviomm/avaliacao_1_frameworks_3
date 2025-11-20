<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4 fill-height" style="border: 1px solid #00F2EA;">
          <v-card-title class="text-h4 text-secondary" style="text-shadow: 0 0 5px #00F2EA;">
            Sobre o Projeto CyberLibrary
          </v-card-title>
          <v-card-text>
            <p class="mb-4">
              Bem-vindo(a) à CyberLibrary, sua central de comando pessoal para o universo dos games. Aqui você pode catalogar os jogos que já conquistou, gerenciar sua lista de desejos para futuras aquisições e manter toda a sua coleção organizada em um só lugar. Perfeito para todo gamer que busca ter o controle total de sua jornada.
            </p>
            <h3 class="text-h6 text-primary mt-6">Tecnologias:</h3>
            <ul>
              <li>Vue 3 (Composition API)</li>
              <li>Vue Router</li>
              <li>Vuetify 3 (com tema customizado)</li>
              <li>LocalStorage para persistência de dados</li>
              <li>Vite</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 fill-height" style="border: 1px solid #FCEE0A;">
          <v-card-title class="text-h4 text-primary" style="text-shadow: 0 0 5px #FCEE0A;">
            Estatísticas da Biblioteca
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-4">
              <span class="text-h6">Total de Jogos no Banco:</span>
              <v-chip color="primary" size="large">{{ totalJogos }}</v-chip>
            </div>

            <v-divider class="my-4"></v-divider>

            <h3 class="text-h6 mb-2">Contagem por Gênero:</h3>
            <v-list bg-color="surface" lines="one">
              <v-list-item
                v-for="(count, genre) in contagemPorGenero"
                :key="genre"
                class="px-1"
              >
                <template v-slot:prepend>
                  <v-chip color="secondary" class="mr-4">{{ count }}</v-chip>
                </template>
                <v-list-item-title>{{ genre }}</v-list-item-title>
              </v-list-item>
            </v-list>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 1. Variável para guardar os jogos carregados
const jogos = ref([])

// 2. Lógica para carregar os jogos do localStorage quando a página é montada
onMounted(() => {
  const jogosSalvos = localStorage.getItem('cyberlib_jogos')
  if (jogosSalvos) {
    jogos.value = JSON.parse(jogosSalvos)
  }
})

// 3. Propriedade COMPUTADA para o total de jogos.
//    Ela se atualiza sozinha se a lista de jogos mudar.
const totalJogos = computed(() => {
  return jogos.value.length
})

// 4. Propriedade COMPUTADA para a contagem por gênero.
//    Ela processa a lista e retorna um objeto com os totais.
const contagemPorGenero = computed(() => {
  if (!jogos.value.length) return {}

  // O método 'reduce' é perfeito para transformar uma lista em um objeto de contagem
  return jogos.value.reduce((acc, jogo) => {
    const genero = jogo.genre || 'Não definido'; // Garante um valor padrão
    if (!acc[genero]) {
      acc[genero] = 0; // Inicia a contagem para um novo gênero
    }
    acc[genero]++; // Incrementa a contagem
    return acc;
  }, {});
})
</script>