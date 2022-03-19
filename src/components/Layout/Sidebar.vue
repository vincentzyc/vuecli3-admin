<template>
  <el-menu
    :default-active="onRoutes"
    active-text-color="#20a0ff"
    background-color="#ffffff"
    style="height: 100%;overflow-y: auto;overflow-x: hidden"
    text-color="#333333"
    unique-opened
  >
    <template v-for="item in crmMenus">
      <template v-if="item.subMenus && item.subMenus.length > 0">
        <el-sub-menu :index="item.menuIndex" :key="item.menuIndex">
          <template #title>
            <span>{{ item.menuName }}</span>
          </template>
          <el-menu-item
            :index="subItem.menuIndex"
            :key="subItem.menuIndex"
            @click="handleClick(subItem.menuIndex)"
            v-for="subItem in item.subMenus"
          >
            <span>{{ subItem.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.menuIndex" :key="item.menuIndex" @click="handleClick(item.menuIndex)">
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isLink } from '@/utils/validate/link';
import { useRoute, useRouter } from 'vue-router'
import crmMenus from './sidebar'

const route = useRoute()
const router = useRouter()

const onRoutes = computed(() => route.path)

const handleClick = (url: string) => {
  if (isLink(url)) return window.open(url);
  router.push(url)
}

</script>


