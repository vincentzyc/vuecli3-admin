<template>
  <div class="welcome-wrap" style="height:100%">
    <img :src="BASE_URL + 'static/img/logo.png'" alt="logo" class="junbo-logo" />
    <span class="junbo-value">创造价值 分享价值</span>
    <div class="welcome-text" v-html="text"></div>
    <img :src="BASE_URL + 'static/img/welcome.jpg'" alt="欢迎" style="width:100%" />
  </div>
</template>

<script setup lang="ts">
import { getLocalStorage, getSessionStorage } from '@/utils/storage'
import { ref, onMounted } from 'vue'

const text = ref("")
const userInfo = ref<null | Record<string, any>>(null)

onMounted(() => {
  if (userInfo.value?.crmMenus) {
    if (Array.isArray(userInfo.value.crmMenus) && userInfo.value?.crmMenus.length > 0) {
      return text.value = `<h1 style="font-size:30px">您好，${userInfo.value?.username}</h1><h2 class="mg-t20" style="font-size:30px">欢迎使用骏伯投放平台</h2>`
    }
  } else {
    return text.value = `<h1 style="font-size:30px">对不起，${userInfo.value?.username}</h1><h2 class="mg-t20" style="font-size:30px">您还没有任何权限，请联系管理员开通</h2>`
  }
})

let localUserInfo = getLocalStorage("contentUserInfo", true);
localUserInfo ? userInfo.value = userInfo : "";

let backUrl = getSessionStorage("backUrl");
if (backUrl) {
  sessionStorage.removeItem("backUrl");
  window.location.href = backUrl;
}

</script>

