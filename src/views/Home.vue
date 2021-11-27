<template>
  <BasePage :paths="breadcrumb">
    <div class="jb-content">
      <h1>home</h1>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import BasePage from "@/components/BasePage/index.vue"
import { computed } from "@vue/reactivity";

const store = useStore()

const breadcrumb = computed(() => store.state.common.breadcrumb)

store.commit('setBreadcrumb', ['111', '222'])

</script>
