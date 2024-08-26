import { ref, computed } from 'vue'

import type { Ref, ComputedRef } from 'vue'

const ERROR_MESSAGES = {
  EMPTY_FIELD: 'Поле не може бути пустим'
}

export function useLoginForm() {
  const form: Ref<{ login: string; password: string }> = ref({ login: "", password: "" })
  const errors: Ref<{ login: string; password: string }> = ref({ login: "", password: "" })

  const validate = () => {
    errors.value = {
      login: !form.value.login.trim() ? ERROR_MESSAGES.EMPTY_FIELD : '',
      password: !form.value.password.trim() ? ERROR_MESSAGES.EMPTY_FIELD : ''
    }
  }

  const isValid: ComputedRef<boolean> = computed(() => !errors.value.login && !errors.value.password)

  return {
    form,
    errors,
    validate,
    isValid
  }
}