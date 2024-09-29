<script setup lang="ts">
  import Paginator from 'primevue/paginator';
  import ProgressBar from 'primevue/progressbar';

  import { ref, type Ref, watch } from 'vue'

  interface Props { 
    params: Record<string, any>, 
    loading?: boolean 
  }

  interface IPaginator {
    page: number,
    first: number,
    rows: number,
    pageCount: number
  }

  const emit = defineEmits<{ 'setParams': [key: string, value: any] }>()

  const props = withDefaults(defineProps<Props>(), {
    loading: false
  })

  const paginator: Ref<IPaginator> = ref({
    first: 0,
    page: 0,
    rows: props.params['per_page'] || 0,
    pageCount: 0,
  })

  watch(
    () => paginator.value,
    (newVal, oldVal) => {
      if(newVal['page'] !== oldVal['page']) {
        emit('setParams', 'page', newVal['page'] + 1)
      }

      if(newVal['rows'] !== oldVal['rows']) {
        emit('setParams', 'per_page', newVal['rows'])
      }
    }
  )

</script>

<template>
  <div class="relative overflow-x-auto">
    <ProgressBar v-if="loading" mode="indeterminate" style="height: 4px"></ProgressBar>
    <table class="w-full text-sm text-left">
      <thead class="uppercase bg-card border-b border-border">
        <slot name="thead"></slot>
      </thead>
      <tbody class="bg-card">
        <slot name="tbody"></slot>
      </tbody>
    </table>
    <Paginator 
      class="mt-5 pagination"
      :rows="params['per_page']" 
      :totalRecords="params['total']" 
      :rowsPerPageOptions="[5, 10, 15, 20]"
      @page="$event => paginator = $event"
    />
  </div>
</template>