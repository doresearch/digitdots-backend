<template>
  <div class="w-300 mx-auto bg-white">
    <div class="font-bold text-xl pt-20">Hi {{ userInfo.fname }} {{ userInfo.lname }}, nice to meet you.</div>
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
        <el-checkbox-group class="w-10 mt-7" v-model="checkedOrders">
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
      </div>
      <div class="border border-solid border-gray-200 mt-10 mx-20"></div>
      <div class="min-h-[20rem]">
        <div class="text-xl leading-1">
          <div class="mb-7">Available tutorial times</div>
          <div class="bg-success-light mb-2 w-100 flex justify-between px-4" v-for="item in orderedTimes" :key="item">
            <div class="mt-2 text-success-dark">
              {{ dayjs(item.orderTime).format('YYYY-MM-DD HH:mm:ss') }}
              <span v-if="item.status === 1">(review)</span>
            </div>
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
    <div class="flex justify-end mt-8">
      <el-button type="success" :disabled="waitList.length === 0" @click="submit">Make Sure</el-button>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { ref, effect, computed, h } from 'vue'
import { searchClassByTeacherId, saveOrders, delMeeting } from '@/api/teacher'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

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
    const orderTime = dayjs(newTime.value).valueOf()
    // 转换成timeStamp
    waitList.value.push({ orderTime })
    checkedOrders.value.push(orderTime)
  }
}

function removeTime(constructor) {
  if (constructor.meetingId) {
    delMeeting({
      meetingId: constructor.meetingId,
    }).then(res => {
      if (res.data.code === 0) {
        orderedTimes.value = orderedTimes.value.filter(item => item.meetingId !== constructor.meetingId)
        // Hi Hao, congratulation!
        ElMessage.success(
          // 组件渲染
          h(
            'div',
            {
              class: 'font-bold text-xl',
            },
            [
              h('div', 'Hi Hao, congratulation!'),
              h('div', "You've set up the time you're available for, enjoy your journey here."),
            ]
          )
        )
        // You've set up the time you're available for, enjoy your journey here.
      } else {
        ElMessage.error(res.data.message)
      }
    })
  } else {
    waitList.value = waitList.value.filter(item => item.orderTime !== constructor.orderTime)
  }
}

function submit() {
  if (checkedOrders.value.length === 0) {
    return ElMessage.error('Please check at least one time')
  }
  const params = {
    teacherId: user.uid,
    meeting: showList.value.filter(item => {
      return checkedOrders.value.indexOf(item.orderTime) !== -1
    }),
  }

  saveOrders(params).then(res => {
    waitList.value = waitList.value.filter(item => {
      return checkedOrders.value.indexOf(item.orderTime) === -1
    })
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
        status: item.status,
      }
    })

    checkedOrders.value = res.data.result?.map?.(item => {
      return item.meeting_id
    })
  })
}

const router = useRouter()

effect(() => {
  if (user.uid) {
    if (user.role === 2) {
      getOrderInfo()
    } else {
      router.push('/')
    }
  } else {
    router.push('/login')
  }
})
</script>
