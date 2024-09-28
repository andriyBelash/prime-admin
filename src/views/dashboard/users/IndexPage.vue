<script setup lang="ts">
  import { useUserStore } from '@/store/users';
  import { onMounted } from 'vue';

  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import UiTable from '@/components/ui/UiTable.vue';

  const chips = {
    admin: { label: 'Адмін', class: 'bg-blue-600' },
    user: { label: 'Користувач', class: 'bg-green-600' }
  }

  const store = useUserStore()

  onMounted(async () => {
    await store.getUsers()
  })
</script>

<template>
  <div>
    <Card>
      <template #title>
        <div class="flex items-center justify-between">
          Список користувачів
          <RouterLink :to="{ name: 'dashboard-users-create' }">
            <Button label="Створити" icon="pi pi-plus" />
          </RouterLink>
        </div>
      </template>
      <template #content>
        <UiTable
          :loading="store.loading"
          :params="store.params"
          @set-params="store.setParams" 
          class="mt-10"
        >
          <template #thead>
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                Лого
              </th>
              <th scope="col" class="px-6 py-3">
                Імʼя
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Роль
              </th>
              <th>
                Дата реєстрації
              </th>
              <th></th>
            </tr>
          </template>
          <template #tbody>
            <template v-for="user of store.users" :key="user.id">
              <tr class="bg-white border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ user.id }}
                </th>
                <td class="px-6 py-4">
                  <img :src="user.picture_url ? user.picture_url : '/public/placeholder.avif'" width="50" height="50" :alt="user.username"/>
                </td>
                <td class="px-6 py-4">
                  {{ user.username }}
                </td>
                <td class="px-6 py-4">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4">
                  <div class="text-white text-center rounded p-[4px]" :class="chips[user.role].class">{{ chips[user.role].label }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ user.created_at }}
                </td>
                <td class="px-6 py-4">
                </td>
              </tr>
            </template>
          </template>
        </UiTable>
      </template>
    </Card>
  </div>
</template>