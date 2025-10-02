<template>
  <v-dialog v-model="dialogInterno" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-primary">
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field label="Título do Jogo*" v-model="jogo.title" :rules="[rules.required]" required></v-text-field>
          <v-text-field label="Plataforma" v-model="jogo.platform"></v-text-field>
          <v-text-field label="Gênero" v-model="jogo.genre"></v-text-field>
          <v-text-field label="Nota Metacritic*" v-model.number="jogo.score" type="number" :rules="[rules.required, rules.score]" required></v-text-field>
          <v-text-field label="URL da Imagem da Capa" v-model="jogo.imageUrl"></v-text-field>
          <v-textarea
            label="Anotações Pessoais"
            v-model="jogo.notes"
            auto-grow
            rows="2"
          ></v-textarea>
        </v-container> <small class="text-primary">*Campos obrigatórios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialogInterno = false">Cancelar</v-btn>
        <v-btn color="primary" variant="tonal" @click="salvar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onUpdated } from 'vue'

const props = defineProps({
  dialog: { type: Boolean, required: true },
  jogoParaEdicao: { type: Object, default: null }
})

const emit = defineEmits(['update:dialog', 'salvar'])

const jogo = ref({ id: null, title: '', platform: '', genre: '', score: null, imageUrl: '', notes: '' })
const formTitle = computed(() => (props.jogoParaEdicao ? 'Editar Jogo' : 'Adicionar Jogo'))

const rules = {
  required: value => !!value || 'Campo obrigatório.',
  score: value => (value >= 0 && value <= 100) || 'A nota deve ser entre 0 e 100.'
}

onUpdated(() => {
  if (props.jogoParaEdicao) {
    jogo.value = { ...props.jogoParaEdicao }
  } else {
    jogo.value = { id: null, title: '', platform: '', genre: '', score: null, imageUrl: '', notes: '' }
  }
})

const dialogInterno = computed({
  get: () => props.dialog,
  set: (val) => emit('update:dialog', val)
})

function salvar() {
  if (jogo.value.title && jogo.value.score >= 0 && jogo.value.score <= 100) {
    emit('salvar', { ...jogo.value })
    dialogInterno.value = false
  }
}
</script>