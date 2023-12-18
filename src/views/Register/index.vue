<template>
  <div class="mx-auto w-200 flex flex-col box-border">
    <!-- <div class="flex flex-1" v-if="AllStep[Step] === 'RoleChoose'">
      <el-radio-group v-model="info.role">
        <el-radio label="1" size="large" border>Option A</el-radio>
        <el-radio label="2" size="large" border>Option B</el-radio>
      </el-radio-group>
    </div> -->
    <div class="flex flex-1">
      <el-form ref="infoFormRef" label-width="200px" :label-position="labelPosition" :model="info" :rules="rules">
        <div v-if="AllStep[Step] === 'RoleInfo-Account'">
          <el-form-item label="role" required>
            <el-radio-group v-model="info.role">
              <el-radio label="1">Option A</el-radio>
              <el-radio label="2">Option B</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Email Address" required>
            <el-input v-model="info.email" name="email" />
          </el-form-item>
          <!-- 过于简单提示 -->
          <el-form-item label="PassWord" required>
            <el-input v-model="info.pass" name="password" />
          </el-form-item>
          <!-- 不一致提示 -->
          <el-form-item label="Confirm Password" required>
            <el-input v-model="info.checkPass" name="password" />
          </el-form-item>
          <el-form-item label="You'll receive a 6-digit code, press it here" required>
            <el-input v-model="info.inviteCode" />
          </el-form-item>
        </div>
        <div v-if="AllStep[Step] === 'RoleInfo-Extend'">
          <div>Who you are?</div>
          <div class="flex justify-between">
            <el-form-item label="First Name" required>
              <el-input v-model="info.fname" />
            </el-form-item>
            <el-form-item label="Last Name" required>
              <el-input v-model="info.lname" />
            </el-form-item>
          </div>
          <el-form-item label="where are you working for" required>
            <el-input v-model="info.lname" />
          </el-form-item>
          <el-form-item label="What's you major" required>
            <el-input v-model="info.lname" />
          </el-form-item>
          <el-form-item label="What's your title in the school" required>
            <el-input v-model="info.lname" />
          </el-form-item>
          <el-form-item label="Use some tags to tell other what you are good at (maxium 3 tags)" required>
            <el-select v-model="info.tags" multiple :multiple-limit="3" placeholder="Please select" />
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="flex justify-end">
      <el-button type="primary" @click="NextStep(infoFormRef)">next</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'

const Step = ref(0)
const AllStep = ['RoleInfo-Account', 'RoleInfo-Extend']

const info = ref({
  role: '',
  email: '',
  pass: '',
  checkPass: '',
  inviteCode: '',
  fname: '',
  lname: '',
  tags: [],
})
const infoFormRef = ref<FormInstance>()

const checkEmail = (rule: any, value: any, callback: any) => {}

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
    },
  ],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
}

const labelPosition = computed(() => (Step.value === 0 ? 'left' : 'top'))

const NextStep = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      Step.value++
      localStorage.setItem('info', JSON.stringify(info.value))
    }
  })
}
</script>
