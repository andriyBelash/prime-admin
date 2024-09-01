import type { RouteLocationNormalized } from "vue-router";

export const setPageTitle = (to: RouteLocationNormalized) => {
  if(to.meta.title){
    document.title = to.meta.title as string
  }
}