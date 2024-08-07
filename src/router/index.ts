import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/AuthLogin.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
