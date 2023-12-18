<template>
  <div class="flex justify-between p-2">
    <div class="bold text-lg">Digitdots</div>
    <div>
      <div class="flex" v-if="isLogin">
        <div class="border-rounded p-2"></div>
        <div>{{ UserInfo.fName }}</div>
      </div>
      <div v-else>
        <router-link to="/home">Home</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const UserInfo = {
  fName: 'wangbo',
  lName: 'zhang',
}
const isLogin = false
</script>
