<template>
  <BasePage :paths="['about', 'about1']" showBack @handle-back="router.back()">
    <div class="jb-content">
      <h1>about1</h1>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "@/components/BasePage/index.vue";
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
