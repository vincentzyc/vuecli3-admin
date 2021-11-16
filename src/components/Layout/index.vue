<template>
  <div class="wrapper">
    <header class="header">
      <JunboHeader />
    </header>
    <div class="sidebar">
      <i id="handle-sidebar" :class="showSidebar ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="toggleSidebar()"></i>
      <JunboSidebar />
    </div>
    <div id="container">
      <div style="min-width: 1160px;height:100%">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import JunboHeader from "./Sidebarcopy.vue";
import JunboSidebar from "./Sidebar.vue";

const showSidebar = ref(true)

const toggleSidebar = () => {
  if (showSidebar.value) {
    if (window.dom_container) window.dom_container.style.left = '0px';
    if (window.dom_handle_sidebar) window.dom_handle_sidebar.style.left = '0px'
  } else {
    if (window.dom_container) window.dom_container.style.left = "200px";
    if (window.dom_handle_sidebar) window.dom_handle_sidebar.style.left = "200px"
  }
  showSidebar.value = !showSidebar.value
}
onMounted(async () => {
  await nextTick()
  window.dom_container = document.getElementById("container");
  window.dom_handle_sidebar = document.getElementById("handle-sidebar");
})
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.header {
  position: relative;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background: #242f42;
}
.sidebar {
  position: absolute;
  width: 200px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #324157;
  -ms-overflow-style: none;
  box-shadow: 10px 0 10px -5px #ddd;
  z-index: 1;
}

.sidebar .el-menu {
  border: none;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

#container {
  background: none repeat scroll 0 0 #fff;
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  box-sizing: border-box;
  overflow: scroll;
  transition: 0.3s;
  background-color: #f7f7f7;
}
#handle-sidebar {
  position: absolute;
  top: 11px;
  left: 200px;
  font-size: 26px;
  z-index: 9999;
  transition: 0.3s;
}
@media screen and (min-width: 720px) {
  #handle-sidebar {
    display: none;
  }
  .user-info {
    padding-right: 50px;
  }
}
</style>

