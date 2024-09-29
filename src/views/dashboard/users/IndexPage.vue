<script setup lang="ts">
  import { useUserStore } from '@/store/users';
  import { onMounted } from 'vue';
  import { useDebounceFn } from '@vueuse/core'
  import { ROLES } from '@/lib/constants';
  import { formattedDate } from '@/lib/functions';
  import { useConfirm } from "primevue/useconfirm";

  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import UiTable from '@/components/ui/UiTable.vue';
  import InputText from 'primevue/inputtext';
  import Select from 'primevue/select';
  import ConfirmPopup from 'primevue/confirmpopup';

  const chips = {
    admin: { label: 'Адмін', class: 'bg-hover-blue text-blue' },
    user: { label: 'Користувач', class: 'bg-hover-grey text-grey' }
  }

  const store = useUserStore()
  const confirm = useConfirm();
  const search = useDebounceFn((e: string) => {
    store.setParams('search', e)
  }, 200)

  const changeRole = (e: string) => {
    if(store.params.role && store.params.role === e) {
      delete store.params.role
    } else {
      store.params.role = e
    }
    store.getUsers()
  }

  const remove = (event: Event, id: number) => {
    confirm.require({
        target: event.currentTarget as HTMLElement,
        message: 'Ви впевнені що хочете видалити користувача?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Відміна',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Видалити',
            severity: 'danger'
        },
        accept: () => {
          store.removeUser(id)
        },
    });
  }

  onMounted(async () => {
    await store.getUsers()
  })
</script>

<template>
  <div>
    <Card class="mt-16">
      <template #title>
        <div class="flex items-center justify-between text-grey text-xl">
          Список користувачів
          <RouterLink :to="{ name: 'dashboard-users-create' }">
            <Button label="Створити" icon="pi pi-plus" />
          </RouterLink>
        </div>
        <div class="flex mt-5 justify-between">
          <InputText 
           @input="(e) => search(e.target.value)" 
           class="w-72"
           placeholder="Пошук" 
          />
          <div>
            <Select 
              class="w-64"
              :model-value="store.params.role"
              @update:model-value="(e) => changeRole(e)"
              :options="ROLES" 
              optionLabel="label" 
              optionValue="key"
              placeholder="Виберіть роль"></Select>
          </div>
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
              <tr class="bg-card border-b border-border">
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
                  <div class="text-center rounded p-[4px]" :class="chips[user.role].class">{{ chips[user.role].label }}</div>
                </td>
                <td class="px-6 py-4">
                  {{ formattedDate(user.created_at) }}
                </td>
                <td class="px-6 py-4">
                  <ConfirmPopup></ConfirmPopup>
                  <Button @click="remove($event, user.id)" label="Видалити" severity="danger" outlined></Button>
                </td>
              </tr>
            </template>
          </template>
        </UiTable>
      </template>
    </Card>
  </div>
</template>