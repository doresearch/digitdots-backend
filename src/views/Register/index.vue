<template>
  <div>
    <div class="flex" v-if="AllStep[Step] === 'RoleChoose'">
      <div onclick="">Student</div>
      <div>Teacher</div>
    </div>
    <div class="flex">
      <el-form
        ref="infoFormRef"
        label-width="100px"
        :model="info"
        style="max-width: 460px"
        :rules="rules"
      >
        <div v-if="AllStep[Step] === 'RoleInfo-Account'">
          <el-form-item label="Email Address" required>
            <el-input v-model="info.email" />
          </el-form-item>
          <!-- 过于简单提示 -->
          <el-form-item label="PassWord" required>
            <el-input v-model="info.pass" />
          </el-form-item>
          <!-- 不一致提示 -->
          <el-form-item label="Confirm Password" required>
            <el-input v-model="info.checkPass" />
          </el-form-item>
        </div>
        <div v-if="AllStep[Step] === 'RoleInfo-Extend'">
          <el-form-item label="You'll receive a 6-digit code, press it here" required>
            <el-input v-model="info.inviteCode"/>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div>
      <el-button @click="NextStep(infoFormRef)">next</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

const Step = ref(1)
const AllStep = ['RoleChoose', 'RoleInfo-Account', 'RoleInfo-Extend']


const info = ref({
  email: '',
  pass: '',
  checkPass: '',
  inviteCode: '',
})
const infoFormRef = ref<FormInstance>()

const checkEmail = (rule: any, value: any, callback: any) => {

}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (info.value.checkPass !== '') {
      if (!info.value) return
      infoFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== info.value.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = {
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    }
  ],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
}

const NextStep = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      Step.value++
      localStorage.setItem('info', JSON.stringify(info.value))
    }
  })
}

</script>