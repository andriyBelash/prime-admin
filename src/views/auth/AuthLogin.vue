<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import type { Ref } from "vue"

import { useLoginForm } from '@/composables/useLoginForm'
import { useGlobalLoading } from '@/composables/useGlobalLoading'

import Card from "primevue/card"
import InputGroup from "primevue/inputgroup"
import InputGroupAddon from "primevue/inputgroupaddon"
import InputText from "primevue/inputtext"
import Button from "primevue/button"

import AuthBackgroundSvg from '@/components/auth/AuthBackgroundSvg.vue'

const router = useRouter()

const { form, errors, validate, isValid } = useLoginForm()
const { loading, setLoading } = useGlobalLoading()

const submit = async () => {
  try {
    setLoading(true)
    await validate()
    if (isValid.value) {
      router.push({ name: "dashboard-home" })
    }
  } finally {
    setLoading(false)
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <AuthBackgroundSvg/>
    <Card class="max-w-[450px] w-full p-6">
      <template #title>
        <span class="text-2xl font-bold">Вхід</span>
      </template>
      <template #subtitle>
        <span class="font-medium"> Будь ласка, введіть свої дані</span>
      </template>
      <template #content>
        <div class="mt-4">
          <div>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText placeholder="Логін" v-model="form.login" />
            </InputGroup>
            <span v-if="errors['login']" class="text-red-500 text-sm">{{ errors["login"] }}</span>
          </div>
          <div>
            <InputGroup class="mt-4">
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <InputText placeholder="Пароль" v-model="form.password" />
            </InputGroup>
            <span v-if="errors['password']" class="text-red-500 text-sm">
              {{ errors["password"] }}
            </span>
          </div>
        </div>
        <Button :loading="loading" @click="submit" class="mt-6 w-full p-blue-500" severity="info">Авторизуватись</Button>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.auth-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
