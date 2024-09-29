<script setup lang="ts">

</script>

<template>
  <div class="bg-card rounded-md border border-border">
    <div class="p-6">
      <slot name="header"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>