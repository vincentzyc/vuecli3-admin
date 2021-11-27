<template>
  <BasePage :paths="breadcrumb" showBack @handle-back="router.back()">
    <div class="jb-content">
      <h1>about1</h1>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
import { useRouter } from 'vue-router'
import BasePage from "@/components/BasePage/index.vue"

const store = useStore()
const router = useRouter()
const breadcrumb = computed(() => store.state.common.breadcrumb)

store.commit('setBreadcrumb', ['about', 'about1'])

</script>