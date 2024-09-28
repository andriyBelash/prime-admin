import { defineStore } from "pinia";
import { ref, type Ref } from 'vue'
import type { SidebarMenuSection } from '@/types/base';

export const useAppStore = defineStore('app', () => {
  const visible: Ref<boolean> = ref(true)
  const menuItems: Ref<SidebarMenuSection[]> = ref([
    {
      label: '',
      items: [
        { icon: 'pi pi-home', label: 'Dashboard', to: '/home', name: 'dashboard-home' },
        { icon: 'pi pi-user', label: 'Users', to: '/users', name: 'dashboard-users' },
      ]
    },
  ]);

  const toggleVisible = () => { visible.value = !visible.value }

  return {
    menuItems,
    visible,
    toggleVisible
  }
})