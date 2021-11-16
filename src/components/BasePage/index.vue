<template>
  <div class="base-page">
    <header class="flex breadcrumb align-middle">
      <el-breadcrumb separator="/" class="flex-auto">
        <el-breadcrumb-item v-for="item in paths as string[]" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2 class="flex-auto text-center">{{ title }}</h2>
      <el-button type="primary" size="small" @click="$emit('handle-back')" v-if="showBack">返回上一页</el-button>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem, ElButton } from 'element-plus'

defineProps({
  title: {
    type: String,
    default: ""
  },
  paths: {
    type: Array,
    default() {
      return [];
    }
  },
  showBack: {
    type: Boolean,
    default: false
  }
})

defineEmits(['handle-back'])

</script>

<style scoped>
.base-page {
  position: relative;
  width: 100%;
  /* height: 100%; */
}
.breadcrumb {
  background: #fff;
  height: 50px;
  padding: 0 30px;
  margin-bottom: 15px;
  position: sticky;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid #eee;
}
</style>
