<template>
  <BasePage :paths="breadcrumb" showBack @handle-back="router.back()">
    <div class="jb-content">
      <h1>获取图片分辨率</h1>
      <input type="file" id="file" @change="imageInfo" accept="image/*" />
      <p>{{ JSON.stringify(info) }}</p>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed, ref } from "vue";
import { useRouter } from 'vue-router'
import BasePage from "@/components/BasePage/index.vue"
import { getImageInfo } from "@/utils/image-info";

const store = useStore()
const router = useRouter()
const breadcrumb = computed(() => store.state.common.breadcrumb)

store.commit('setBreadcrumb', ['about', 'about1'])

const info = ref()

function imageInfo() {
  const elFiles = document.getElementById('file') as HTMLInputElement
  if (elFiles) {
    if (elFiles.files && elFiles.files.length > 0) {
      for (let i = 0; i < elFiles.files.length; i++) {
        const file = elFiles.files[i]
        getImageInfo(file).then(obj => {
          info.value = obj
        }).catch((error: any) => {
          console.log(error)
        })
      }
    }
  }
}

</script>