<template>
  <div class="mx-auto w-300 flex flex-col box-border">
    <!-- <div class="flex flex-1" v-if="AllStep[Step] === 'RoleChoose'">
      <el-radio-group v-model="info.role">
        <el-radio label="1" size="large" border>Option A</el-radio>
        <el-radio label="2" size="large" border>Option B</el-radio>
      </el-radio-group>
    </div> -->
    <div class="flex flex-1 w-full">
      <el-form
        ref="infoFormRef"
        class="w-full mt-10"
        label-width="200px"
        :label-position="labelPosition"
        :model="info"
        :rules="rules"
      >
        <div v-if="AllStep[Step] === 'RoleInfo-Account'">
          <div class="flex">
            <div class="flex-1">
              <el-form-item label="role" prop="role" required>
                <el-radio-group v-model="info.role">
                  <el-radio label="2">Teacher</el-radio>
                  <el-radio label="3">Student</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Email Address" prop="account" required>
                <el-input v-model="info.account" name="email" />
              </el-form-item>
              <!-- 过于简单提示 -->
              <el-form-item label="PassWord" prop="password" required>
                <el-input v-model="info.password" name="password" type="password" />
              </el-form-item>
            </div>
            <div className="ml-6">
              <el-form-item prop="avator" label-width="0">
                <Upload v-model="info.avator" />
              </el-form-item>
            </div>
          </div>
          <div>
            <!-- 不一致提示 -->
            <el-form-item label="Confirm Password" prop="checkPass" required>
              <el-input v-model="info.checkPass" name="password" type="password" />
            </el-form-item>
            <el-form-item label="You'll receive a 6-digit code, press it here" prop="inviteByCode">
              <el-input v-model="info.inviteByCode" />
            </el-form-item>
          </div>
        </div>
        <div v-if="AllStep[Step] === 'RoleInfo-Extend'">
          <div class="text-3xl mb-10 bold text-center">Who you are?</div>
          <div class="flex justify-between">
            <el-form-item class="flex-1" label="First Name" prop="fname" required>
              <el-input v-model="info.fname" />
            </el-form-item>
            <el-form-item class="ml-2 flex-1" label="Last Name" prop="lname" required>
              <el-input v-model="info.lname" />
            </el-form-item>
          </div>
          <el-form-item label="where are you working for" prop="company">
            <el-input v-model="info.company" />
          </el-form-item>
          <el-form-item label="What's you major" prop="major">
            <el-input v-model="info.major" />
          </el-form-item>
          <el-form-item label="What's your title in the school" prop="school">
            <el-input v-model="info.school" />
          </el-form-item>
          <!-- <el-form-item label="Use some tags to tell other what you are good at (maxium 3 tags)" required>
            <el-select v-model="info.tags" multiple :multiple-limit="3" placeholder="Please select" />
          </el-form-item> -->
        </div>
      </el-form>
    </div>

    <div class="flex justify-end">
      <el-button type="primary" @click="NextStep(infoFormRef)">next</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="Register">
import { ref, computed } from 'vue'
import { FormInstance, ElMessage } from 'element-plus'
import { UserService, registerUser } from '../../api'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import Upload from '@/components/Uploder.vue'
import { useUserStore } from '@/store/user'

const Step = ref(0)
const AllStep = ['RoleInfo-Account', 'RoleInfo-Extend']

const info = ref({
  role: '',
  avator: '',
  account: '',
  password: '',
  checkPass: '',
  inviteByCode: '',
  fname: '',
  lname: '',
  tags: [],
  company: '',
  major: '',
  school: '',
})
const infoFormRef = ref<FormInstance>()

const checkEmail = (rule: any, value: any, callback: any) => {}

const validatePass = (rule: any, value: any, callback: any) => {
  console.log(value)
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
  } else if (value !== info.value.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = {
  account: [
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
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  role: [{ required: true, message: 'Please select role', trigger: 'change' }],
  avator: [{ required: true, message: 'Please upload avator', trigger: 'blur' }],
}

const labelPosition = computed(() => (Step.value === 0 ? 'left' : 'top'))

const router = useRouter()
const user = useUserStore()

const NextStep = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      if (Step.value + 1 > AllStep.length - 1) {
        const params = info.value
        params.password = md5(info.value.password + 'digitdots')
        registerUser(params).then(async res => {
          if (res.data?.code === 0) {
            ElMessage.success('register success')
            // 注册成功之后自动登录
            // router.push('/login')
            const { code, result, message } = await UserService.authLogin<{ token: string }>(params)
            if (code === 0) {
              ElMessage.success('login success')
              localStorage.setItem('token', 'Bearer ' + result.token || '')
              user.getUserInfo()
              if (info.value.role === '2') {
                router.push('/setting/my-meeting')
              } else {
                router.push('/')
              }
            } else {
              params.password = ''
              ElMessage.error(message)
            }
          } else {
            ElMessage.error(res.data?.message)
          }
        })
      } else {
        Step.value++
        localStorage.setItem('info', JSON.stringify(info.value))
      }
    }
  })
}
</script>
