<template>
  <div>
    <h1>用户注册</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" v-model="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" v-model="lastName" required />
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="inviteCode">邀请码:</label>
        <input type="text" v-model="inviteCode" />
      </div>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const inviteCode = ref('')

const registerUser = () => {
  console.log('注册用户:', {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value,
    inviteCode: inviteCode.value,
  })

  // 清空表单字段
  firstName.value = ''
  lastName.value = ''
  username.value = ''
  password.value = ''
  inviteCode.value = ''
}
</script>

<style lang="scss" scoped>
/* 在这里添加组件的样式 */
</style>
