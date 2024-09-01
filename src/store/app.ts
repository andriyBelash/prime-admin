import { defineStore } from "pinia";
import { ref, type Ref } from 'vue'
import type { SidebarMenuSection } from '@/types/base';

export const useAppStore = defineStore('app', () => {
  const visible: Ref<boolean> = ref(true)
  const menuItems: Ref<SidebarMenuSection[]> = ref([
    {
      label: '',
      items: [
        { icon: 'pi pi-home', label: 'Dashboard', to: '/home' },
        { icon: 'pi pi-bookmark', label: 'Bookmarks', to: '/bookmarks' },
        {
          icon: 'pi pi-chart-line',
          label: 'Reports',
          items: [
            {
              icon: 'pi pi-chart-line',
              label: 'Revenue',
              items: [
                { icon: 'pi pi-table', label: 'View', to: '/reports/revenue/view' },
                { icon: 'pi pi-search', label: 'Search', to: '/reports/revenue/search' }
              ]
            },
            { icon: 'pi pi-chart-line', label: 'Expenses', to: '/reports/expenses' }
          ]
        },
        { icon: 'pi pi-users', label: 'Team', to: '/team' },
        { icon: 'pi pi-comments', label: 'Messages', to: '/messages', badge: '3' },
        { icon: 'pi pi-calendar', label: 'Calendar', to: '/calendar' },
        { icon: 'pi pi-cog', label: 'Settings', to: '/settings' }
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