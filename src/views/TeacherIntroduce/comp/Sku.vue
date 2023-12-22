<template>
  <div class="mt-4">
    <div class="border p-4 flex justify-between" :key="item.meeting_id" v-for="item in infos">
      <div class="bold p-2">order time: {{ item.order_time }}</div>
      <el-button type="primary" @click="preOrder(item.meeting_id)">order</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { searchClassByTeacherId } from '../../../api/teacher'
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

function preOrder(meetingId: string) {
  console.log(meetingId)
}

effect(() => {
  getSkuList()
})
</script>
