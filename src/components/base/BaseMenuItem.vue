<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import type { SidebarMenuItem } from '@/types/base';

const props = defineProps<{ item: SidebarMenuItem }>();
const route = useRoute();
const router = useRouter();

const isActive = computed(() => {
  if (props.item.to) {
    return route.path.includes(props.item.to);
  }
  return false;
});

const isOpen = ref(props.item.items?.some(subItem => route.path.includes(subItem.to as string)))

const navigate = (to: string) => {
  if (to) {
    router.push(`/dashboard${to}`);
  }
};
</script>

<template>
  <li class="cursor-pointer mt-2">
    <div
      v-if="!item.items"
      @click="navigate(item.to || '')"
      v-ripple
      class="flex items-center cursor-pointer py-2 px-6 rounded transition-colors duration-150"
      :class="{
        'bg-blue-100 font-black bg-hover-blue': isActive,
        'text-gray-600 hover:bg-hover-grey': !isActive
      }"
    >
      <i class="mr-2" :class="{ 'text-blue': isActive, 'text-grey': !isActive, [item.icon]: true }"></i>
      <span :class="{ 'font-black text-blue': isActive, 'font-medium text-grey': !isActive }">{{ item.label }}</span>
      <span
        v-if="item.badge"
        class="inline-flex items-center justify-center ml-auto bg-blue-500 text-white rounded-full"
        style="min-width: 1.5rem; height: 1.5rem"
      >{{ item.badge }}</span>
    </div>
    <div v-else>
      <div
        v-ripple
        @click="isOpen = !isOpen"
        class="flex items-center cursor-pointer py-2 px-6 rounded transition-colors duration-150"
        :class="{
        'bg-blue-100 font-black bg-transparent hover:bg-blue-100': isOpen,
        'text-gray-600 hover:bg-gray-100 dark:text-gray-600 dark:hover:bg-blue-100': !isOpen
        }"
      >
        <i :class="item.icon + ' mr-2'" class="text-blue-500"></i>
        <span class="font-medium">{{ item.label }}</span>
        <i :class="['pi ml-auto', false ? 'pi-chevron-up' : 'pi-chevron-down']"></i>
      </div>
      <ul
        v-show="isOpen"
        class="list-none py-0 pl-4 pr-0 m-0 overflow-hidden transition-all duration-300 ease-in-out"
      >
        <BaseMenuItem v-for="subItem in item.items" :key="subItem.label" :item="subItem" />
      </ul>
    </div>
  </li>
</template>