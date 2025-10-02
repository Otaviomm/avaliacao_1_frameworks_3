<template>
  <v-app-bar color="surface" density="compact">
    <v-app-bar-title class="cyber-title glitch" data-text="CyberLibrary">
      <v-icon icon="mdi-controller-classic-outline" class="mr-2"></v-icon>
      CyberLibrary
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Gerenciar</v-btn>
    <v-btn to="/library" text>Biblioteca</v-btn>
    <v-btn to="/about" text>Sobre</v-btn>
  </v-app-bar>
</template>

<style scoped>
.cyber-title {
  color: #FCEE0A; /* Amarelo Cyberpunk */
  text-shadow: 0 0 5px #FCEE0A;
}

/* EFEITO GLITCH COMEÇA AQUI */
.glitch {
  position: relative;
  animation: noise-anim-2 3s infinite linear alternate-reverse;
}

.glitch::before,
.glitch::after {
  content: attr(data-text); /* Pega o texto do atributo data-text */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.glitch::before {
  left: 2px;
  text-shadow: -1px 0 #FF00F8; /* Sombra Magenta */
  clip-path: inset(50% 0 50% 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: 1px 0 #00F2EA; /* Sombra Ciano */
  clip-path: inset(10% 0 85% 0);
  animation: noise-anim 3s infinite linear alternate-reverse;
}

/* Animação que move os pseudo-elementos */
@keyframes noise-anim {
  0% { clip-path: inset(10% 0 85% 0); }
  10% { clip-path: inset(80% 0 5% 0); }
  20% { clip-path: inset(45% 0 45% 0); }
  30% { clip-path: inset(90% 0 2% 0); }
  40% { clip-path: inset(15% 0 75% 0); }
  50% { clip-path: inset(60% 0 30% 0); }
  60% { clip-path: inset(75% 0 10% 0); }
  70% { clip-path: inset(0% 0 90% 0); }
  80% { clip-path: inset(55% 0 20% 0); }
  90% { clip-path: inset(35% 0 55% 0); }
  100% { clip-path: inset(80% 0 15% 0); }
}

/* Animação que treme levemente o texto principal */
@keyframes noise-anim-2 {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-1px, -1px); }
  20% { transform: translate(1px, 1px); }
  30% { transform: translate(1px, -1px); }
  40% { transform: translate(-1px, 1px); }
  50% { transform: translate(-1px, -1px); }
  60% { transform: translate(1px, 1px); }
  70% { transform: translate(0, 0); }
  80% { transform: translate(1px, -1px); }
  90% { transform: translate(-1px, 1px); }
  100% { transform: translate(0, 0); }
}
</style>