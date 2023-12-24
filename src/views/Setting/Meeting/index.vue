<template>
  <div class="w-300 mx-auto">
    <div class="font-bold text-xl">Hi {{ userInfo.fname }} {{ userInfo.lname }}, nice to meet you.</div>
    <div class="font-bold text-xl text-info mt-4">
      I’m glad to welcome you here and thank you for bring your knowledge to others.
    </div>
    <div class="w-full mt-25 flex">
      <div class="flex-1">
        <div class="text-xl mb-7">Please set the time you are available for students to choose a tutorial here.</div>
        <!-- 禁止选取今天之前的时间 -->
        <el-date-picker v-model="newTime" type="datetime" :disabled-date="disabledDate"></el-date-picker>
        <el-button class="ml-4" type="success" :icon="Plus" plain @click="addToWaitList" :disabled="newTime === ''"
          >Add</el-button
        >
      </div>
      <div class="border border-solid border-gray-200 mt-10 mx-20"></div>
      <div class="min-h-[20rem]">
        <el-checkbox-group v-model="checkedOrders">
          <el-checkbox v-for="item in waitList" :key="item.orderTime" :label="item.orderTime">
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
        <div class="text-xl text-info">
          <div>Available tutorial times</div>
          <div v-for="item in orderedTimes" :key="item">
            {{ dayjs(item.orderTime).format('YYYY-MM-DD HH:mm:ss') }}
            <el-button
              class="!m-0 !p-0 !mb-1.5 !ml-2"
              :icon="Delete"
              @click="removeTime(item)"
              type="danger"
              text
            ></el-button>
          </div>
        </div>
      </div>
    </div>
    <el-button class="float-right" type="success" :disabled="checkedOrders.length === 0" @click="submit"
      >Make Sure</el-button
    >
  </div>
</template>
<script lang="ts" setup>
import { ref, effect, computed } from 'vue'
import { searchClassByTeacherId, saveOrders, delMeeting } from '@/api/teacher'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/user'

const user = useUserStore()

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
  const isExist = showList.value.find(item => item.orderTime === dayjs(newTime.value).valueOf())
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
  if (constructor.meetingId) {
    delMeeting({
      meetingId: constructor.meetingId,
    }).then(res => {
      if (res.code) {
        orderedTimes.value = orderedTimes.value.filter(item => item.meetingId !== constructor.meetingId)
        ElMessage({
          type: 'success',
          message: res.data.result,
        })
      } else {
        ElMessage.error(res.data.message)
      }
    })
  } else {
    waitList.value = waitList.value.filter(item => item.orderTime !== constructor.orderTime)
  }
}

function submit() {
  const params = {
    teacherId: user.uid,
    meeting: showList.value.filter(item => {
      return checkedOrders.value.indexOf(item.orderTime) !== -1
    }),
  }

  saveOrders(params).then(res => {
    getOrderInfo()
  })
}

function getOrderInfo() {
  searchClassByTeacherId({
    teacherId: user.uid,
  }).then(res => {
    orderedTimes.value = res.data.result?.map?.(item => {
      return {
        orderTime: Number(item.order_time),
        meetingId: item.meeting_id,
      }
    })

    checkedOrders.value = res.data.result?.map?.(item => {
      return item.meeting_id
    })
  })
}

effect(() => {
  if (user.uid) {
    getOrderInfo()
  }
})
</script>
