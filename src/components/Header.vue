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
        <!-- Todo: order list -->
        <!-- <div
          class="cursor-normal cursor-pointer relative"
          @mouseover="() => (isShowOrderList = true)"
          @mouseleave="() => (isShowOrderList = false)"
        >
          {{ user.fname }}
          <OrderList :isShow="isShowOrderList" />
        </div> -->
        <el-dropdown>
          <span>{{ user.fname }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/setting/my-metting" v-if="user.role === 2"
                ><el-dropdown-item>order time</el-dropdown-item></router-link
              >
              <router-link to="/my-order"><el-dropdown-item>My Order</el-dropdown-item></router-link>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class="ml-2 -mt-0.5 cursor-pointer hover:text-danger" @click="logout">
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
import { useUserStore } from '@/store/user'
import { SwitchButton } from '@element-plus/icons-vue'

const user = useUserStore()

function logout() {
  localStorage.setItem('token', '')
  user.logout()
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
    &.router-link-active {
      &::before {
        background-color: #000;
      }
    }
  }
}
</style>
