<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="move" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: "app"
};
</script>