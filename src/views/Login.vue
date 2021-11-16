<template>
  <div class="login-wrap"></div>
</template>

<script setup lang="ts">
import { CommonApi, getLoginUrl } from "@/api";
import { getUrlParam } from "@/utils";
import { closeLoading, openLoading } from "@/utils/loading";
import { getSessionStorage, setLocalStorage } from "@/utils/storage";

interface typeCheckToken {
  id: number,
  data: any
}

const getUserInfo = async (token: string) => {
  openLoading();
  let res = await CommonApi.checkToken<typeCheckToken>('?token=' + token)
  let crmMenus = await CommonApi.getSideBar({ userId: res.id });
  let userInfo = {
    crmMenus: crmMenus,
    ...res.data
  };
  setLocalStorage("creativeUserInfo", userInfo, true);
  closeLoading();
  let backUrl = getSessionStorage("backUrl");
  if (backUrl) {
    sessionStorage.removeItem("backUrl");
    window.location.href = backUrl;
    return;
  }
  window.location.href = window.location.origin + window.location.pathname
}

const token = getUrlParam('token');
if (token) {
  getUserInfo(token);
} else {
  window.location.href = await getLoginUrl();
}
</script>