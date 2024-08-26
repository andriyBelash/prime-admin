<script setup lang="ts">
  import ProgressSpinner from 'primevue/progressspinner';
  import { useGlobalLoading } from '@/composables/useGlobalLoading'

  const { loading } = useGlobalLoading()
</script>

<template>
  <div class="h-full">
    <slot></slot>
    <div class="fixed z-50 bottom-3 right-3" v-if="loading" >
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="5" fill="transparent" animationDuration="1s" aria-label="Custom ProgressSpinner" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
