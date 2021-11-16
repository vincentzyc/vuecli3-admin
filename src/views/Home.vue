<template>
  <BasePage :paths="[111, 222]" showBack @handle-back="$router.back()">
    <div class="jb-content">
      <h1>asdfasdf</h1>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "@/components/BasePage/index.vue";
</script>
