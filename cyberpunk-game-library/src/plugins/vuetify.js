import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Define nosso tema customizado
const cyberpunkTheme = {
  dark: true,
  colors: {
    background: '#0D0D1A', // Azul muito escuro
    surface: '#1E1E3C',    // Superfície dos cards
    primary: '#FCEE0A',   // Amarelo Cyberpunk
    secondary: '#00F2EA', // Ciano Neon
    error: '#FF00F8',     // Magenta/Rosa Neon
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'cyberpunkTheme',
    themes: {
      cyberpunkTheme,
    },
  },
})