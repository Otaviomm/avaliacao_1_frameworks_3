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
      <v-card>
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
import { ref, onMounted, watch } from 'vue'
import GameForm from '@/components/GameForm.vue'

const jogos = ref([])
const dialog = ref(false)
const jogoParaEdicao = ref(null)
const snackbar = ref(false)
const snackbarText = ref('')
const dialogExcluir = ref(false)
const jogoParaExcluir = ref(null)

const headers = [
  { title: 'Título', value: 'title' },
  { title: 'Plataforma', value: 'platform' },
  { title: 'Gênero', value: 'genre' },
  { title: 'Nota', value: 'score' },
  { title: 'Ações', value: 'actions', sortable: false }
]


const top10Games = [
  { id: 1, title: 'The Legend of Zelda: Ocarina of Time', platform: 'Nintendo 64', genre: 'Action-Adventure', score: 99, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/1/17/The_Legend_of_Zelda_Ocarina_of_Time_capa.png' },
  { id: 2, title: 'Tony Hawk\'s Pro Skater 2', platform: 'PlayStation', genre: 'Sports', score: 98, imageUrl: 'https://static.metacritic.com/images/products/games/1/e335030d3d81b31a3f13961b3c9a2d8d-98.jpg' },
  { id: 3, title: 'Grand Theft Auto IV', platform: 'PlayStation 3', genre: 'Action-Adventure', score: 98, imageUrl: 'https://static.metacritic.com/images/products/games/4/cb03cad56553835694207823e5975e47-98.jpg' },
  { id: 4, title: 'SoulCalibur', platform: 'Dreamcast', genre: 'Fighting', score: 98, imageUrl: 'https://static.metacritic.com/images/products/games/5/360c1c876251a3dd319a2e76555198a1-98.jpg' },
  { id: 5, title: 'Super Mario Galaxy', platform: 'Wii', genre: 'Platformer', score: 97, imageUrl: 'https://static.metacritic.com/images/products/games/4/a2f4044815145b23e21825dd51e51b9e-98.jpg' },
  { id: 6, title: 'Red Dead Redemption 2', platform: 'PlayStation 4', genre: 'Action-Adventure', score: 97, imageUrl: 'https://static.metacritic.com/images/products/games/8/18b233b2a59c991b97a22a36f5628a8d-98.jpg' },
  { id: 7, title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo Switch', genre: 'Action-Adventure', score: 97, imageUrl: 'https://static.metacritic.com/images/products/games/9/e0a149c41a1a722ac9e99c3d42b9c79f-98.jpg' },
  { id: 8, title: 'Half-Life 2', platform: 'PC', genre: 'FPS', score: 96, imageUrl: 'https://static.metacritic.com/images/products/games/3/f06883556c4d8acec18251e0f63a3def-98.jpg' },
  { id: 9, title: 'The Orange Box', platform: 'PC', genre: 'Compilation', score: 96, imageUrl: 'https://static.metacritic.com/images/products/games/1/4005b736780c653018265a7f9a1f5923-98.jpg' },
  { id: 10, title: 'Baldur\'s Gate 3', platform: 'PC', genre: 'RPG', score: 96, imageUrl: 'https://static.metacritic.com/images/products/games/5/2c035d21a209939f42111d96030c6a53-98.jpg' },
];


onMounted(() => {
  const jogosSalvos = localStorage.getItem('cyberlib_jogos')
  if (jogosSalvos) {
    jogos.value = JSON.parse(jogosSalvos)
  } else {
    // Se não houver nada salvo, carrega a lista top 10
    jogos.value = top10Games;
  }
})

watch(jogos, (novosJogos) => {
  localStorage.setItem('cyberlib_jogos', JSON.stringify(novosJogos))
}, { deep: true })

function abrirDialog() {
  jogoParaEdicao.value = null
  dialog.value = true
}

function editarJogo(jogo) {
  jogoParaEdicao.value = { ...jogo }
  dialog.value = true
}

function salvarJogo(jogo) {
  if (jogo.id) {
    const index = jogos.value.findIndex(j => j.id === jogo.id)
    jogos.value[index] = jogo
    snackbarText.value = "Jogo atualizado com sucesso!"
  } else {
    jogo.id = Date.now()
    jogos.value.push(jogo)
    snackbarText.value = "Jogo adicionado à biblioteca!"
  }
  snackbar.value = true
}

function abrirDialogExclusao(jogo) {
  jogoParaExcluir.value = jogo // Guarda o jogo que o usuário quer excluir
  dialogExcluir.value = true // Abre o diálogo
}

function confirmarExclusao() {
  if (jogoParaExcluir.value) {
    const index = jogos.value.findIndex(j => j.id === jogoParaExcluir.value.id)
    if (index !== -1) {
      jogos.value.splice(index, 1)
      snackbarText.value = "Jogo removido da biblioteca!"
      snackbar.value = true
    }
  }
  dialogExcluir.value = false // Fecha o diálogo
}
</script>