<template>
  <div class="mt-10">
    <div class="text-2xl mb-4">Book the time for your next tutorial</div>
    <div
      class="border p-4 mb-4 flex justify-between hover:bg-info group rounded-md shadow-md hover:shadow-none"
      :key="item.meeting_id"
      v-for="item in infos"
    >
      <div class="p-2 text-info group-hover:text-white">
        order time: <span class="font-bold text-xl text-black group-hover:text-white">{{ item.order_time }}</span>
      </div>
      <el-button type="primary" @click="preOrder(item.meeting_id)">Book</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchClassByTeacherId } from '@/api/teacher'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { effect, ref } from 'vue'
import dayjs from 'dayjs'

const { query } = useRoute()

const infos = ref([])

const getSkuList = async () => {
  if (!query.id) {
    ElMessage.info('暂无数据')
    return
  }

  if (typeof query.id === 'string') {
    const res = await searchClassByTeacherId({
      teacherId: query.id,
    })

    infos.value = (Array.isArray(res.data.result) ? res.data.result : []).map(item => {
      return {
        ...item,
        order_time: dayjs(item.order_time, 'x').format('YYYY-MM-DD HH:mm:ss'),
      }
    })
  }
}

const router = useRouter()

function preOrder(meetingId: string) {
  router.push({
    path: '/order-detail',
    query: {
      meetingId,
    },
  })
}

effect(() => {
  getSkuList()
})
</script>
