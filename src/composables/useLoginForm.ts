import { ref, computed } from 'vue'

import type { Ref, ComputedRef } from 'vue'

const ERROR_MESSAGES = {
  EMPTY_FIELD: 'Поле не може бути пустим'
}

export function useLoginForm() {
  const form: Ref<{ email: string; password: string }> = ref({ email: "", password: "" })
  const errors: Ref<{ email: string; password: string }> = ref({ email: "", password: "" })

  const validate = () => {
    errors.value = {
      email: !form.value.email.trim() ? ERROR_MESSAGES.EMPTY_FIELD : '',
      password: !form.value.password.trim() ? ERROR_MESSAGES.EMPTY_FIELD : ''
    }
  }

  const isValid: ComputedRef<boolean> = computed(() => !errors.value.email && !errors.value.password)

  return {
    form,
    errors,
    validate,
    isValid
  }
}