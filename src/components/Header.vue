<template>
  <div class="flex justify-between p-2 text-3xl">
    <div class="bold">
      <router-link to="/">Digitdots</router-link>
    </div>
    <!-- <el-tabs v-model="activeName" class="flex" @tab-click="handleClick">
      <el-tab-pane label="Home" name="Home"></el-tab-pane>
      <el-tab-pane label="Home1" name="Home1"></el-tab-pane>
      <el-tab-pane label="Order" name="Order"></el-tab-pane>
      <el-tab-pane label="Home3" name="Home3"></el-tab-pane>
    </el-tabs> -->
    <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleClick">
      <el-menu-item index="0">Home</el-menu-item>
      <el-menu-item index="1">Home1</el-menu-item>
      <el-menu-item index="2">Home2</el-menu-item>
      <el-menu-item index="3">Home3</el-menu-item>
    </el-menu>

    <div>
      <div class="flex" v-if="user.isLogin">
        <div class="border-rounded p-2"></div>
        <div>{{ user.fname }}</div>
      </div>
      <div v-else>
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const user = useUserStore()

const activeIndex = ref('first')
const router = useRouter()

const handleClick = (tab: any, event: any) => {
  console.log(tab, event)
  // router.push(`/${tab.paneName}`)
}
</script>
