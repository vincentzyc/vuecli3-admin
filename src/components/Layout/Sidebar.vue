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
            :key="i"
            @click="handleClick(subItem.menuIndex, subItem.menuName, item.menuName)"
            v-for="(subItem,i) in item.subMenus"
          >
            <span>{{ subItem.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.menuIndex" :key="item.menuIndex" @click="handleClick(item.menuIndex, item.menuName)">
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getLocalStorage } from '@/utils/storage';
import { isLink } from '@/utils/validate/link';
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

interface menuItems {
  subMenus: menuItems[],
  menuIndex: string,
  menuName: string
}

const route = useRoute()
const router = useRouter()

const crmMenus = ref<menuItems[]>([])
const onRoutes = computed(() => "/" + route.path.split("/")[1])

const handleClick = (url: string, title: string, parName?: string) => {
  window._paq.push(["trackEvent", parName || title, title]);
  if (isLink(url)) return window.open(url);
  router.push(url)
}

let userInfo = getLocalStorage("creativeUserInfo", true);
userInfo ? crmMenus.value = userInfo.crmMenus : [];
</script>


