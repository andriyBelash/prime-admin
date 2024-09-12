import type { RouteLocationNormalized } from "vue-router";

export const setPageTitle = (to: RouteLocationNormalized) => {
  if(to.meta.title){
    document.title = to.meta.title as string
  }
}

export const guards = (to: RouteLocationNormalized) => {
  const token = localStorage.getItem('access_token')
  const isProtected = to.fullPath.includes('dashboard')
  if (token) {
    if (to.name !== 'dashboard-home') {
      return { name: 'dashboard-home' }
    }
  } else {
    if (isProtected) {
      return { name: 'auth-login' }
    }
  }
  return true
}