import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importar Pinia
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia()) // Usar Pinia
app.use(router)
app.use(vuetify)

app.mount('#app')