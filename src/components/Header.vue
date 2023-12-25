<template>
  <div class="flex justify-between p-2 pt-20 text-3xl">
    <div class="font-black">
      <router-link to="/">Digitdots</router-link>
    </div>

    <div class="menu-content flex font-medium text-2xl">
      <router-link class="item" to="/united-kingdom"> The United Kingdom </router-link>
      <router-link class="item" to="/united-states">The United States</router-link>
      <router-link class="item" to="/booking">Booking</router-link>
      <router-link class="item" to="/about">About</router-link>
    </div>

    <div class="w-60 text-lg">
      <div class="flex" v-if="user.isLogin">
        <div class="border-rounded p-2"></div>
        <div>{{ user.fname }}</div>
        <div>
          <el-icon><SwitchButton /></el-icon>
        </div>
      </div>
      <div v-else>
        <router-link to="/register">Register</router-link>
        <router-link class="ml-2" to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const user = useUserStore()
const router = useRouter()
</script>

<style lang="scss" scoped>
.menu-content {
  column-gap: 24px;

  .item {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -12px;
      left: 0;
      width: 100%;
      height: 4px;
    }
    &:hover,
    &.router-link-active {
      &::before {
        background-color: #000;
      }
    }
  }
}
</style>
