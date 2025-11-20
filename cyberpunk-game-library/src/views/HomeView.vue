<template>
  <v-container>
    <h1 class="text-primary mb-4" style="text-shadow: 0 0 5px #FCEE0A;">Gerenciador da Biblioteca</h1>
    
    <v-btn color="primary" @click="abrirDialog" class="mb-4">Adicionar Jogo</v-btn>

    <v-data-table :headers="headers" :items="jogos" class="elevation-1">
      <template #item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editarJogo(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="abrirDialogExclusao(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <GameForm v-model:dialog="dialog" :jogoParaEdicao="jogoParaEdicao" @salvar="salvarJogo" />

    <v-dialog v-model="dialogExcluir" persistent max-width="500px">
      <v-card class="game-card">
        <v-card-title class="text-h5 text-error">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
          Você tem certeza que deseja remover 
          <strong>{{ jogoParaExcluir ? jogoParaExcluir.title : '' }}</strong> 
          da sua biblioteca? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogExcluir = false">Cancelar</v-btn>
          <v-btn color="error" variant="tonal" @click="confirmarExclusao">
            Confirmar Exclusão
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="2000" color="secondary">{{ snackbarText }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' // IMPORTANTE: Agora usamos axios em vez de localStorage
import GameForm from '@/components/GameForm.vue'

// Variáveis de Estado
const jogos = ref([])
const dialog = ref(false)
const dialogExcluir = ref(false)
const jogoParaEdicao = ref(null)
const jogoParaExcluir = ref(null)
const snackbar = ref(false)
const snackbarText = ref('')

// Configuração da Tabela
const headers = [
  { title: 'Título', value: 'title' },
  { title: 'Plataforma', value: 'platform' },
  { title: 'Gênero', value: 'genre' },
  { title: 'Nota', value: 'score' },
  { title: 'Ações', value: 'actions', sortable: false }
]

// URL do seu Backend
const API_URL = 'http://localhost:3000/games'

// --- FUNÇÕES DE INTEGRAÇÃO COM O BACKEND ---

// 1. Carregar Jogos (READ)
async function carregarJogos() {
  try {
    const response = await axios.get(API_URL)
    jogos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar jogos:', error)
    snackbarText.value = "Erro ao conectar com o servidor"
    snackbar.value = true
  }
}

// Carrega os dados assim que a página abre
onMounted(() => {
  carregarJogos()
})

// 2. Salvar Jogo (CREATE / UPDATE)
async function salvarJogo(jogo) {
  try {
    if (jogo.id) {
      // Se tem ID, é EDIÇÃO (PUT)
      await axios.put(`${API_URL}/${jogo.id}`, jogo)
      snackbarText.value = "Jogo atualizado com sucesso!"
    } else {
      // Se não tem ID, é CRIAÇÃO (POST)
      await axios.post(API_URL, jogo)
      snackbarText.value = "Jogo adicionado à biblioteca!"
    }
    
    // Atualiza a tabela
    await carregarJogos()
    snackbar.value = true
    dialog.value = false // Fecha o formulário
  } catch (error) {
    console.error('Erro ao salvar:', error)
    snackbarText.value = "Erro ao salvar jogo"
    snackbar.value = true
  }
}

// 3. Excluir Jogo (DELETE)
async function confirmarExclusao() {
  if (jogoParaExcluir.value) {
    try {
      await axios.delete(`${API_URL}/${jogoParaExcluir.value.id}`)
      snackbarText.value = "Jogo removido da biblioteca!"
      snackbar.value = true
      
      // Atualiza a tabela
      await carregarJogos()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      snackbarText.value = "Erro ao excluir jogo"
      snackbar.value = true
    }
  }
  dialogExcluir.value = false
}

// --- FUNÇÕES DE INTERFACE (Abrir/Fechar Modais) ---

function abrirDialog() {
  jogoParaEdicao.value = null
  dialog.value = true
}

function editarJogo(jogo) {
  // Cria uma cópia para não editar direto na tabela antes de salvar
  jogoParaEdicao.value = { ...jogo }
  dialog.value = true
}

function abrirDialogExclusao(jogo) {
  jogoParaExcluir.value = jogo
  dialogExcluir.value = true
}
</script>

<style scoped>
.game-card {
  border: 1px solid #FF00F8; /* Borda Neon Rosa para o dialog de excluir */
}
</style>