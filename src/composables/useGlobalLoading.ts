import { ref, type Ref } from 'vue'

const loading: Ref<boolean> = ref(false)

export const useGlobalLoading = () => {

  const setLoading = (payload: boolean): void => { loading.value = payload }

  return { loading, setLoading }
}