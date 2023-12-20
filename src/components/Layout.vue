<template>
  <div class="common-layout">
    <header class="main-hd">
      <Header />
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer>Footer</footer>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import Header from './Header.vue'

const user = useUserStore()

user.getUserInfo()
</script>

<style lang="scss" scoped>
.main-hd {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding: 0;
  background-color: #fff;
  z-index: 10;
}
.main-content {
  margin-top: 100px;
  padding: 0;
}
</style>
