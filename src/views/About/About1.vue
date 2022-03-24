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
import { ref } from "vue";
import { useRouter } from 'vue-router'
import BasePage from "@/components/BasePage/index.vue"
import { getImageInfo } from "@/utils/image-info";

import { useMainStore } from '@/pinia'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { breadcrumb } = storeToRefs(mainStore)

mainStore.setBreadcrumb(['about', 'about1'])

const router = useRouter()

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