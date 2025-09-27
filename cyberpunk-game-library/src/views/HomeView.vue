<template>
  <v-container>
    <h1 class="text-primary mb-4" style="text-shadow: 0 0 5px #FCEE0A;">Gerenciador da Biblioteca</h1>
    <v-btn color="primary" @click="abrirDialog" class="mb-4">Adicionar Jogo</v-btn>

    <v-data-table :headers="headers" :items="jogos" class="elevation-1">
      <template #item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editarJogo(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="excluirJogo(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <GameForm v-model:dialog="dialog" :jogoParaEdicao="jogoParaEdicao" @salvar="salvarJogo" />
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

const headers = [
  { title: 'Título', value: 'title' },
  { title: 'Plataforma', value: 'platform' },
  { title: 'Gênero', value: 'genre' },
  { title: 'Nota', value: 'score' },
  { title: 'Ações', value: 'actions', sortable: false }
]

const top10Games = [
  { id: 1, title: 'The Legend of Zelda: Ocarina of Time', platform: 'Nintendo 64', genre: 'Action-Adventure', score: 99, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/8/8e/The_Legend_of_Zelda_Ocarina_of_Time_capa.png' },
  { id: 2, title: 'Tony Hawk\'s Pro Skater 2', platform: 'PlayStation', genre: 'Sports', score: 98, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/f/f5/Tony_Hawk%27s_Pro_Skater_2_capa.png/250px-Tony_Hawk%27s_Pro_Skater_2_capa.png' },
  { id: 3, title: 'Grand Theft Auto IV', platform: 'PlayStation 3', genre: 'Action-Adventure', score: 98, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/c/c3/Grand_Theft_Auto_IV_capa.png/270px-Grand_Theft_Auto_IV_capa.png' },
  { id: 4, title: 'SoulCalibur', platform: 'Dreamcast', genre: 'Fighting', score: 98, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/82/Soulcalibur_-_DC.jpg/250px-Soulcalibur_-_DC.jpg' },
  { id: 5, title: 'Super Mario Galaxy', platform: 'Wii', genre: 'Platformer', score: 97, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/3/36/Super_Mario_Galaxy_capa.png/250px-Super_Mario_Galaxy_capa.png' },
  { id: 6, title: 'Red Dead Redemption 2', platform: 'PlayStation 4', genre: 'Action-Adventure', score: 97, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/88/Red_Dead_Redemption_2_capa.png/270px-Red_Dead_Redemption_2_capa.png' },
  { id: 7, title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo Switch', genre: 'Action-Adventure', score: 97, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/1/1b/The_Legend_of_Zelda_Breath_of_the_Wild_capa.png/250px-The_Legend_of_Zelda_Breath_of_the_Wild_capa.png' },
  { id: 8, title: 'Half-Life 2', platform: 'PC', genre: 'FPS', score: 96, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/2/25/Half-Life_2_capa.png/250px-Half-Life_2_capa.png' },
  { id: 9, title: 'The Orange Box', platform: 'PC', genre: 'Compilation', score: 96, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/91/The_Orange_Box_capa.jpg/250px-The_Orange_Box_capa.jpg' },
  { id: 10, title: 'Baldur\'s Gate 3', platform: 'PC', genre: 'RPG', score: 96, imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/c/ce/Baldur%27s_Gate_3_capa.png/250px-Baldur%27s_Gate_3_capa.png' },
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

function excluirJogo(jogo) {
  const index = jogos.value.findIndex(j => j.id === jogo.id)
  jogos.value.splice(index, 1)
  snackbarText.value = "Jogo removido da biblioteca!"
  snackbar.value = true
}
</script>