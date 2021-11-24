<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: "app",
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    }
  }
})
</script>