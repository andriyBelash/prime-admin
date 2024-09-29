import { defineStore } from "pinia";
import { ref } from 'vue'
import { UserServices } from "@/api/User";

import type { Ref } from "vue";
import type { IFormUser, User } from "@/types/user";

export const useUserStore = defineStore('users', () => {

  const users: Ref<User[]> = ref([])
  const params: Ref<Record<string, any>> = ref({ page: 1, per_page: 5, total: 1 })
  const loading = ref(false)

  const form: Ref<IFormUser> = ref({
    file: null,
    username: '',
    password: '',
    role: 'user',
    email: ''
  })

  const clearForm = () => {
    form.value = {
      file: null,
      username: '',
      password: '',
      role: 'user',
      email: ''
    }
  }

  const setParams = (key: string, value: string) => {
    if(key === 'page') {
      params.value['page'] = 1
    }
    params.value[key] = value
    getUsers()
  }

  const getUsers = async(): Promise<void> => {
    try {
      loading.value = true
      const res = await UserServices.getAll(params.value)
      users.value = res.data.data
      params.value['total'] = res.data.meta.total
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 100)
    }
  }

  const onSubmit = async (id?: number) => {
    const formData = new FormData()

    if(form.value.username) formData.append('username', form.value.username)
    if(form.value.email) formData.append('email', form.value.email)
    if(form.value.password) formData.append('password', form.value.password)
    if(form.value.role) formData.append('role', form.value.role)
    if(form.value.file && typeof form.value.file !== 'string') formData.append('file', form.value.file)

    if(id) {
      console.log('UPDATE')
    } else {
      await UserServices.create(formData)
    }
  }

  const removeUser = async(id: number) => {
    await UserServices.remove(id)
    getUsers()
  }

  return {
    users,
    params,
    loading,
    form,
    clearForm,
    onSubmit,
    getUsers,
    setParams,
    removeUser
  }
})