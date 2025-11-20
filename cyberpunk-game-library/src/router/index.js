import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Importar a store
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView }, // Rota pública [cite: 112]
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } }, // Rota protegida [cite: 114]
    // ... Adicione meta: { requiresAuth: true } nas outras rotas (library, about, game-detail)
  ]
})

// Guard de navegação [cite: 108]
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.checkUser() // Verifica se tem sessão ativa

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login') // Redireciona para login se não estiver autenticado
  } else {
    next()
  }
})

export default router