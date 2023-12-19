<template>
  <div class="w-200 mx-auto">
    <div class="bold text-xl">Hi, {{ userInfo.fname }} {{ userInfo.lname }}</div>
    <div class="w-200 mt-4">
      <div class="text-xl text-info">
        please add your order information here
        <el-date-picker v-model="orderedTimes"></el-date-picker>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, effect } from 'vue'
import { searchClassByTeacherId } from '@/api/teacher'
/**
 * 老师上架商品
 */
const userInfo = ref({
  fname: 'jone',
  lname: 'Alex',
})
const orderedTimes = ref([])

function getOrderInfo() {
  searchClassByTeacherId({
    teacherId: '118ff182-74f7-43e9-8fe9-ade6f1906a24',
  }).then(res => {
    console.log(res)
  })
}

effect(() => {
  getOrderInfo()
})
</script>
