<template>
  <BasePage :paths="breadcrumb">
    <div class="jb-content">
      <h1>获取视频第一帧（支持多选）</h1>
      <input type="file" id="file" @change="getFirstFrames" multiple />
      <img :src="item" alt="第一帧" v-for="(item,key) in firstFrames" :key="key" />
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "@/components/BasePage/index.vue"
import { useStore } from "@/store";
import { ref, computed } from "vue";
import { getPoster } from "@/utils/video-info";

const store = useStore()

const breadcrumb = computed(() => store.state.common.breadcrumb)

store.commit('setBreadcrumb', ['home', 'home1'])

const firstFrames = ref<string[]>([])

function getFirstFrames() {
  const elFiles = document.getElementById('file') as HTMLInputElement
  if (elFiles) {
    if (elFiles.files && elFiles.files.length > 0) {
      for (let i = 0; i < elFiles.files.length; i++) {
        const file = elFiles.files[i]
        getPoster(file).then(obj => {
          console.log(obj);
          firstFrames.value.push(obj.posterUrl)
        }).catch((error: any) => {
          console.log(error)
        })
      }
    }
  }
}

</script>
