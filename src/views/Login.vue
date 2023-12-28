<template>
  <div class="mx-auto w-200 flex flex-col box-border">
    <div class="flex flex-1 w-full">
      <el-form ref="infoFormRef" class="w-full mt-10" label-width="200px" :model="info" :rules="rules">
        <div>
          <div class="text-3xl mb-10 bold text-center">Login</div>
          <el-form-item label="Username" prop="account" required>
            <el-input v-model="info.account" />
          </el-form-item>
          <el-form-item label="Password" prop="password" required>
            <el-input v-model="info.password" type="password" autocomplete="off" />
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="flex justify-end">
      <el-button type="primary" @click="onClickLogin(infoFormRef)">Login</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserService } from '@/api'
import { useUserStore } from '@/store/user'
import { ElMessage, FormInstance } from 'element-plus'
import md5 from 'md5'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()

const infoFormRef = ref<FormInstance>()

const info = reactive({
  account: '',
  password: '',
})

const rules = {
  account: [
    {
      required: true,
      message: 'Please input Username',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input the password',
      trigger: 'blur',
    },
  ],
}

const onClickLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (!valid) {
      return
    }

    const params = info
    params.password = md5(info.password + 'digitdots')
    const { code, result, message } = await UserService.authLogin<{ token: string }>(params)
    if (code === 0) {
      ElMessage.success('login success')
      localStorage.setItem('token', 'Bearer ' + result.token || '')
      user.getUserInfo()
      router.push('/')
    } else {
      params.password = ''
      ElMessage.error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
/* 在这里添加组件的样式 */
</style>
