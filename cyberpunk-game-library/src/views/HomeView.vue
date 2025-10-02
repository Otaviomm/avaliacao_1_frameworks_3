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
  { id: 1, title: 'The Legend of Zelda: Ocarina of Time', platform: 'Nintendo 64', genre: 'Action-Adventure', score: 99, imageUrl: '/images/zelda_oot.jpg', notes: '' },
  { id: 2, title: 'Tony Hawk\'s Pro Skater 2', platform: 'PlayStation', genre: 'Sports', score: 98, imageUrl: '/images/thps2.jpg', notes: '' },
  { id: 3, title: 'Grand Theft Auto IV', platform: 'PlayStation 3', genre: 'Action-Adventure', score: 98, imageUrl: '/images/gta4.jpg', notes: '' },
  { id: 4, title: 'SoulCalibur', platform: 'Dreamcast', genre: 'Fighting', score: 98, imageUrl: '/images/soulcalibur.jpg', notes: '' },
  { id: 5, title: 'Super Mario Galaxy', platform: 'Wii', genre: 'Platformer', score: 97, imageUrl: '/images/mario_galaxy.jpg', notes: '' },
  { id: 6, title: 'Red Dead Redemption 2', platform: 'PlayStation 4', genre: 'Action-Adventure', score: 97, imageUrl: '/images/rdr2.jpg', notes: '' },
  { id: 7, title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo Switch', genre: 'Action-Adventure', score: 97, imageUrl: '/images/zelda_botw.jpg', notes: '' },
  { id: 8, title: 'Half-Life 2', platform: 'PC', genre: 'FPS', score: 96, imageUrl: '/images/hl2.jpg', notes: '' },
  { id: 9, title: 'The Orange Box', platform: 'PC', genre: 'Compilation', score: 96, imageUrl: '/images/orange_box.jpg', notes: '' },
  { id: 10, title: 'Baldur\'s Gate 3', platform: 'PC', genre: 'RPG', score: 96, imageUrl: '/images/bg3.jpg', notes: '' },
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