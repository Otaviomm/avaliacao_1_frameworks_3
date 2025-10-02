import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameDetailView from '../views/GameDetailView.vue' // 1. IMPORTA A NOVA VIEW

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/LibraryView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // 2. ADICIONA A NOVA ROTA DINÂMICA
    {
      path: '/game/:id',
      name: 'game-detail',
      component: GameDetailView
    }
  ]
})

export default router