<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4 fill-height" style="border: 1px solid #00F2EA;">
          <v-card-title class="text-h4 text-secondary" style="text-shadow: 0 0 5px #00F2EA;">
            Sobre o Projeto CyberLibrary v2.0
          </v-card-title>
          <v-card-text>
            <p class="mb-4">
              Bem-vindo(a) à CyberLibrary, sua central de comando pessoal para o universo dos games. 
              Esta aplicação evoluiu para uma arquitetura <strong>Full Stack</strong>, garantindo que seus dados 
              estejam seguros na nuvem e acessíveis de qualquer lugar via login seguro.
            </p>
            
            <v-divider class="my-4"></v-divider>

            <h3 class="text-h6 text-primary mt-2">Stack Tecnológica:</h3>
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-monitor-dashboard">
                <strong>Frontend:</strong> Vue 3 + Vuetify 3 + Vite
              </v-list-item>
              <v-list-item prepend-icon="mdi-server-network">
                <strong>Backend:</strong> Node.js + Express (API REST)
              </v-list-item>
              <v-list-item prepend-icon="mdi-database">
                <strong>Banco de Dados:</strong> Supabase (PostgreSQL)
              </v-list-item>
              <v-list-item prepend-icon="mdi-lock">
                <strong>Autenticação:</strong> Google OAuth 2.0
              </v-list-item>
              <v-list-item prepend-icon="mdi-state-machine">
                <strong>Gestão de Estado:</strong> Pinia
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 fill-height" style="border: 1px solid #FCEE0A;">
          <v-card-title class="text-h4 text-primary" style="text-shadow: 0 0 5px #FCEE0A;">
            Estatísticas da Nuvem
          </v-card-title>
          
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-4">
              <span class="text-h6">Total de Jogos no Banco:</span>
              <v-chip color="primary" size="large">{{ totalJogos }}</v-chip>
            </div>

            <v-divider class="my-4"></v-divider>

            <h3 class="text-h6 mb-2">Distribuição por Gênero:</h3>
            
            <div v-if="loading" class="text-center py-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
              <p class="text-caption">Analisando dados...</p>
            </div>

            <v-list v-else bg-color="surface" lines="one" class="rounded">
              <v-list-item
                v-for="(count, genre) in contagemPorGenero"
                :key="genre"
                class="px-1"
              >
                <template v-slot:prepend>
                  <v-chip color="secondary" class="mr-4 font-weight-bold">{{ count }}</v-chip>
                </template>
                <v-list-item-title class="text-uppercase">{{ genre }}</v-list-item-title>
                <template v-slot:append>
                  <v-progress-linear
                    :model-value="(count / totalJogos) * 100"
                    color="secondary"
                    height="6"
                    style="width: 100px;"
                    rounded
                  ></v-progress-linear>
                </template>
              </v-list-item>
            </v-list>

             <div v-if="!loading && totalJogos === 0" class="text-center text-grey">
                Nenhum dado encontrado no servidor.
             </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const jogos = ref([])
const loading = ref(true)
const API_URL = 'http://localhost:3000/games'

onMounted(async () => {
  try {
    const response = await axios.get(API_URL)
    jogos.value = response.data
  } catch (error) {
    console.error("Erro ao carregar estatísticas:", error)
  } finally {
    loading.value = false
  }
})

const totalJogos = computed(() => {
  return jogos.value.length
})

const contagemPorGenero = computed(() => {
  if (!jogos.value.length) return {}

  return jogos.value.reduce((acc, jogo) => {
    const genero = jogo.genre ? jogo.genre.toUpperCase() : 'NÃO DEFINIDO';
    if (!acc[genero]) {
      acc[genero] = 0;
    }
    acc[genero]++;
    return acc;
  }, {});
})
</script>