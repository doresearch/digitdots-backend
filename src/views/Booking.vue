<template>
  <div class="w-200 mx-auto">
    <div class="text-center font-bold text-3xl py-10">我们的服务</div>
    <div class="p-4 flex" v-for="item in teacherList" :key="item.uid">
      <div>
        <img
          width="200"
          height="200"
          src="https://static.wixstatic.com/media/b08604e0d3654bd3b18dd4b85fefcf79.jpg/v1/fill/w_938,h_650,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/b08604e0d3654bd3b18dd4b85fefcf79.jpg"
          alt=""
        />
      </div>
      <div class="border flex-1 text-3xl p-4 cursor-pointer hover:text-info" @click="goTo(item)">
        <div>{{ item.fname }} {{ item.lname }}</div>
        <div class="border-t my-4"></div>
        <div class="flex flex-wrap text-ellipsis">
          <div class="text-xl font-thin ml-2" v-for="citem in item.meeting" :key="citem.id">
            {{ dayjs(citem.order_time, 'x').format('YYYY-MM-DD HH:mm') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { effect, ref } from 'vue'
import dayjs from 'dayjs'
import { getAllTeacher, searchClassByTeacherIds } from '@/api/teacher'
import { useRouter } from 'vue-router'

const teacherList = ref(0)

async function getAllTeacherInfo() {
  const techerInfo = await getAllTeacher()
  getTeacherInfo(techerInfo.data?.result)
}

// 通过老师id获取老师信息
async function getTeacherInfo(teacher: any[]) {
  const teacherIds = teacher.map(item => {
    return item.uid
  })
  const info = await searchClassByTeacherIds({ teacherIds })
  const classCache = {}
  info.data?.result.map(item => {
    if (classCache[item.teacher_id]) {
      classCache[item.teacher_id].push(item)
    } else {
      classCache[item.teacher_id] = [item]
    }
  })

  teacherList.value = teacher
    .map(item => {
      return { ...item, meeting: classCache[item.uid] }
    })
    .filter(item => item.meeting)
}

const router = useRouter()

function goTo(teacher: any) {
  router.push({
    path: '/teacher-introduce',
    query: {
      id: teacher.uid,
    },
  })
}

effect(() => {
  getAllTeacherInfo()
})
</script>
