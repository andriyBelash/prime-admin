<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/app';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import BaseMenuItem from './BaseMenuItem.vue';

const store = useAppStore()
const route = useRoute()
const router = useRouter()

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
  router.push({ name: 'auth-login' })
}

const sidebarClass = computed(() => ({
  'fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out transform': true,
  '-translate-x-full': !store.visible,
  'translate-x-0': store.visible
}));

</script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-surface-900">
    <div class="flex flex-grow">
      <!-- Sidebar -->
      <aside 
        :class="sidebarClass" 
        class="bg-sidebar border-r border-dashed border-white py-4">
        <div class="flex pt-4 px-6 text-blue font-black text-2xl">
          БЛОГ
        </div>
        <nav class="h-full overflow-y-auto py-4 px-6">
          <ul v-for="section in store.menuItems" :key="section.label" class="list-none m-0">
            <li>
              <div v-if="section.label" class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400">
                <span class="font-medium">{{ section.label }}</span>
              </div>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <BaseMenuItem v-for="item in section.items" :key="item.label" :item="item" />
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow py-4 px-8 transition-all duration-300 bg-sidebar" :class="{ 'ml-72': store.visible }">
        <!-- Header -->
        <header class="flex justify-between">
          <div class="flex gap-6 items-center">
            <Button @click="store.toggleVisible" icon="pi pi-bars" style="color: #fff" text rounded aria-label="menu"></Button>
            <span class="font-bold text-base text-grey">{{ route.meta.title }}</span>
          </div>
          <Button @click="logout" icon="pi pi-sign-out" style="color: #fff" text rounded aria-label="menu"></Button>
        </header>
        <div class="mt-4 h-[90%]">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>