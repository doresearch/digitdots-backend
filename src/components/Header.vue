<template>
  <div class="flex justify-between p-2 pt-20 text-3xl">
    <div class="font-black">
      <router-link to="/">Digitdots</router-link>
    </div>

    <div class="menu-content flex font-medium text-2xl">
      <router-link class="item" to="/">The United Kingdom</router-link>
      <router-link class="item" to="/">The United States</router-link>
      <router-link class="item" to="/">Booking</router-link>
      <router-link class="item" to="/">About</router-link>
    </div>

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
    &.active {
      &::before {
        background-color: #000;
      }
    }
  }
}
</style>
