<template>
  <div class="welcome-wrap" style="height:100%">
    <img :src="BASE_URL + 'static/img/logo.png'" alt="logo" class="junbo-logo" />
    <span class="junbo-value">创造价值 分享价值</span>
    <div class="welcome-text" v-html="text"></div>
    <img :src="BASE_URL + 'static/img/welcome.jpg'" alt style="width:100%" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      userInfo: null
    }
  },
  mounted() {
    if (Array.isArray(this.userInfo.crmMenus) && this.userInfo.crmMenus.length > 0) {
      return this.text = `<h1 style="font-size:30px">您好，${this.userInfo.username}</h1><h2 class="mg-t20" style="font-size:30px">欢迎使用骏伯投放平台</h2>`
    }
    return this.text = `<h1 style="font-size:30px">对不起，${this.userInfo.username}</h1><h2 class="mg-t20" style="font-size:30px">您还没有任何权限，请联系管理员开通</h2>`
  },
  created() {
    let userInfo = this.$util.getLStorage("contentUserInfo", "decode");
    userInfo ? this.userInfo = userInfo : "";

    let backUrl = this.$util.getSStorage("backUrl");
    if (backUrl) {
      sessionStorage.removeItem("backUrl");
      window.location.href = backUrl;
    }
  }
}
</script>

