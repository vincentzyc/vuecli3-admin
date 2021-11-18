<template>
  <div class="about">
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
