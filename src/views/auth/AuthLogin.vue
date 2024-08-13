<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import type { Ref } from "vue"

import Card from "primevue/card"
import InputGroup from "primevue/inputgroup"
import InputGroupAddon from "primevue/inputgroupaddon"
import InputText from "primevue/inputtext"
import Button from "primevue/button"

const router = useRouter()

const form: Ref<{ login: string; password: string }> = ref({ login: "", password: "" })
const error: Ref<{ login: string; password: string }> = ref({ login: "", password: "" })
const loading: Ref<boolean> = ref(false)

const validate = (): boolean => {
  const errors = {
    login: !form.value.login ? "Поле не може бути пустим" : "",
    password: !form.value.password ? "Поле не може бути пустим" : ""
  }

  error.value = errors

  return !errors.login && !errors.password
}

const submit = () => {
  try {
    loading.value = true
    const isValid = validate()
    if (isValid) {
      router.push({ name: "dashboard-home" })
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <svg class="fixed w-full h-full z-0 inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 800" preserveAspectRatio="none" style="z-index: -1">
      <rect fill="#6366f1" width="1600" height="800"></rect>
      <path fill="#8183f4" d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2478.4 581z"></path>
      <path fill="#9ea0f6" d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"></path>
      <path fill="#bcbdf9" d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"></path>
      <path fill="#dadafc" d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"></path>
    </svg>
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
            <span v-if="error['login']" class="text-red-500 text-sm">{{ error["login"] }}</span>
          </div>
          <div>
            <InputGroup class="mt-4">
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <InputText placeholder="Пароль" v-model="form.password" />
            </InputGroup>
            <span v-if="error['password']" class="text-red-500 text-sm">
              {{ error["password"] }}
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
