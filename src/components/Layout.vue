<template>
  <div class="common-layout">
    <header class="main-hd">
      <Header />
    </header>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="py-12 text-center text-lg">
      <div class="font-bold text-3xl">Buzziing</div>
      <div class="font-semibold mt-2">mr.menghao@gmail.com</div>
      <div class="mt-2 font-thin text-info">Buzziing Corporation ©2023</div>
      <div class="mt-1 font-thin text-info">All rights reserved.</div>
    </footer>
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
  min-height: calc(100vh - 277px);
}
</style>
