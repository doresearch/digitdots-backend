<template>
  <div class="w-200 mx-auto">
    <div class="bold text-xl">Hi, {{ userInfo.fname }} {{ userInfo.lname }}</div>
    <div class="w-200 mt-4">
      <div class="text-xl text-info">
        please add your order information here
        <!-- 禁止选取今天之前的时间 -->
        <el-date-picker v-model="newTime" type="datetime" :disabled-date="disabledDate"></el-date-picker>
        <el-button
          class="ml-4"
          type="success"
          :icon="Plus"
          plain
          @click="addToWaitList"
          :disabled="newTime === ''"
        ></el-button>
      </div>
      <div>
        <el-checkbox-group v-model="checkedOrders">
          <el-checkbox v-for="item in showList" :key="item.orderTime" :label="item.orderTime">
            {{ dayjs(item.orderTime).format('YYYY-MM-DD HH:mm:ss') }}
            <el-button
              class="!m-0 !p-0 !mb-1.5 !ml-2"
              :icon="Delete"
              @click="removeTime(item)"
              type="danger"
              text
            ></el-button>
          </el-checkbox>
        </el-checkbox-group>

        <el-button type="success" :disabled="checkedOrders.length === 0" @click="submit">Make Sure</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, effect, computed } from 'vue'
import { searchClassByTeacherId, saveOrders } from '@/api/teacher'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
/**
 * 老师上架商品
 */
const userInfo = ref({
  fname: 'jone',
  lname: 'Alex',
})
// 本地新增的时间
const waitList = ref([])
// 后端返回的时间
const orderedTimes = ref([])
// 显示的时间
const showList = computed(() => {
  return waitList.value.concat(orderedTimes.value).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
})
// 选中的时间
const checkedOrders = ref([])
const newTime = ref('')

function disabledDate(time) {
  return time.getTime() < Date.now()
}

function addToWaitList() {
  // 在waitList、orderedTimes中相同的时间不允许增加
  const isExist = showList.value.find(item => item.orderTime === newTime.value)
  if (isExist) {
    ElMessage.error('该时间已经存在')
    return
  }
  if (newTime.value) {
    waitList.value.push({
      // 转换成timeStamp
      orderTime: dayjs(newTime.value).valueOf(),
    })
  }
}

function removeTime(constructor) {
  if (constructor.id) {
    orderedTimes.value = orderedTimes.value.filter(item => item.id !== constructor.id)
  } else {
    waitList.value = waitList.value.filter(item => item.orderTime !== constructor.orderTime)
  }
}

function submit() {
  const params = {
    teacherId: '118ff182-74f7-43e9-8fe9-ade6f1906a24',
    meeting: showList.value.filter(item => {
      return checkedOrders.value.indexOf(item.orderTime) !== -1
    }),
  }

  saveOrders(params).then(res => {
    console.log(res)
    orderedTimes.value = res.data.result
  })
}

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
