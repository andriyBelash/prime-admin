<script setup lang="ts">
  import Card from 'primevue/card';
  import Select from 'primevue/select';
  import InputText from 'primevue/inputtext';
  import Toast from 'primevue/toast';
  import Button from 'primevue/button';

  import { useUserStore } from '@/store/users';
  import { useToast } from "primevue/usetoast";
  import { ref, type Ref } from 'vue'
  import { ROLES } from '@/lib/constants';
  import { validateEmail } from '@/lib/form';

  const toast = useToast();
  const store = useUserStore()
  const demoImage: Ref<string | null> = ref(null)
  const confirmPassword = ref('')
  const error: Ref<Record<string, string>> = ref({})

  const onUpload = (e: Event) => {
    const file =((e.target as HTMLInputElement).files as FileList)[0]
    demoImage.value = URL.createObjectURL(file)
    store.form.file = file
  };

  const checkErrors = () => {
  return Boolean(Object.keys(error.value).length)
}

const validate = (): boolean => {
  error.value = {}

  // Перевірка на пусті поля
  if (!store.form.username) {
    error.value.username = 'Поле не може бути пустим';
  }
  if (!store.form.email) {
    error.value.email = 'Поле не може бути пустим';
  }
  if (!store.form.password) {
    error.value.password = 'Поле не може бути пустим';
  }
  if (!confirmPassword.value) {
    error.value.confirm_password = 'Поле не може бути пустим';
  }

  if (checkErrors()) {
    return false;
  }

  // Перевірка на валідність email
  if (!validateEmail(store.form.email)) {
    error.value.email = 'Введіть валідну пошту';
  }

  if (checkErrors()) {
    return false;
  }

  if (store.form.password !== confirmPassword.value) {
    error.value.password = 'Паролі не збігаються';
    error.value.confirm_password = 'Паролі не збігаються';
  }

  return !checkErrors();
}


  const onSubmit = async () => {
    const isValid = validate()

    if(isValid) {
      await store.onSubmit()
      console.log('VALID', store.form)
    }
  }


</script>

<template>
  <div class="form-user-cards mt-10">
    <Toast />
    <Card>
      <template #content>
        <div class="flex flex-col items-center gap-5">
          <div class="card flex justify-center file-uploader">
            <input id="file" type="file" @change="(e) => onUpload(e)"/>
            <label for="file">
              <img v-if="demoImage" :src="demoImage" alt="user">
              <img v-else src="/public/placeholder-user.webp" alt="user">
            </label>
          </div>
          <div>
            <label for="username">Імʼя</label>
            <InputText 
              placeholder="Введіть імʼя..." 
              id="username" 
              class="w-full mt-2" 
              v-model="store.form.username"
              aria-describedby="username-help"
              :invalid="Boolean(error['username'])"
            />
            <small class="text-red-500" id="username-help">{{ error['username'] }}</small>
          </div>
        </div>
      </template>
    </Card>
    <Card>
      <template #content>
        <form>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="email">Email</label>
              <InputText 
                placeholder="Введіть пошту..." 
                id="email" 
                type="email" 
                class="w-full mt-2" v-model="store.form.email"
                aria-describedby="email-help"
                :invalid="Boolean(error['email'])"
              />
              <small class="text-red-500" id="email-help">{{ error['email'] }}</small>
            </div>
            <div class="flex flex-col gap-2">
              <label for="role">Роль</label>
              <Select 
                v-model="store.form.role" 
                :options="ROLES" 
                optionLabel="label" 
                optionValue="key"
                placeholder="Виберіть роль"></Select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label for="password">Пароль</label>
              <InputText 
                placeholder="Введіть пароль..." 
                id="password" 
                type="password" 
                class="w-full mt-2" 
                v-model="store.form.password"
                aria-describedby="password-help"
                :invalid="Boolean(error['password'])"
              />
              <small class="text-red-500" id="password-help">{{ error['password'] }}</small>
            </div>
            <div>
              <label for="confirm_password">Підтвердіть пароль</label>
              <InputText 
                placeholder="Введіть пароль..." 
                id="confirm_password" 
                type="password" 
                class="w-full mt-2" 
                v-model="confirmPassword"
                aria-describedby="confirm_password-help"
                :invalid="Boolean(error['confirm_password'])"
              />
              <small class="text-red-500" id="confirm_password-help">{{ error['confirm_password'] }}</small>
  
            </div>
          </div>
          <Button @click="onSubmit" class="mt-[72px] ml-auto flex" label="Створити"/>
        </form>
      </template>
    </Card>
  </div>
</template>

<style>
  .form-user-cards{
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 24px;
  }
  .file-uploader{
    width: 100%;
  }
  .file-uploader input{
    display: none;
  }
  .file-uploader label img{
    width: 200px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    height: 200px;
  }
</style>