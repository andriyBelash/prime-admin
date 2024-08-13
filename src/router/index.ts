import LayoutDefault from '@/layout.ts/LayoutDefault.vue'
import LayoutEmpty from '@/layout.ts/LayoutEmpty.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        component: () => import('@/views/auth/AuthLogin.vue'),
        name: 'auth-login',
        meta: {
          layout: LayoutEmpty
        }
      }
    ]
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '/home',
        name: 'dashboard-home',
        component: () => import('@/views/dashboard/HomePage.vue'),
        meta: {
          layout: LayoutDefault
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
