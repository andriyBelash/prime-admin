import LayoutDefault from "@/layout/LayoutDefault.vue"
import LayoutEmpty from "@/layout/LayoutEmpty.vue"
import { guards, setPageTitle } from "@/lib/router"
import { createRouter, createWebHistory } from "vue-router"
import type { Router, RouteLocationNormalized } from 'vue-router';

const routes = [
  {
    path: "/auth",
    children: [
      {
        path: "login",
        component: () => import("@/views/auth/AuthLogin.vue"),
        name: "auth-login",
        meta: {
          layout: LayoutEmpty,
          title: 'Вхід'
        }
      }
    ]
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "home",
        name: "dashboard-home",
        component: () => import("@/views/dashboard/HomePage.vue"),
        meta: {
          layout: LayoutDefault,
          title: 'Головна'
        }
      },
      // # USERS
      {
        path: "users",
        name: "dashboard-users",
        component: () => import("@/views/dashboard/users/IndexPage.vue"),
        meta: {
          layout: LayoutDefault,
          title: 'Користувачі'
        }
      },
      {
        path: "users/create",
        name: "dashboard-users-create",
        component: () => import("@/views/dashboard/users/FormPage.vue"),
        meta: {
          layout: LayoutDefault,
          title: 'Створити користувача'
        }
      },
      {
        path: "users/:userId",
        name: "dashboard-users-update",
        component: () => import("@/views/dashboard/users/FormPage.vue"),
        meta: {
          layout: LayoutDefault,
          title: 'Редагувати користувача'
        }
      },
      {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/views/system/NotFound.vue"),
        meta: {
          layout: LayoutDefault,
          title: 'Сторінки не знайдено'
        }
      },
    ]
  }
]

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to: RouteLocationNormalized) => {
  setPageTitle(to);
  return guards(to);
})

export default router
