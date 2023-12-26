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
      <div class="border flex-1 text-2xl mt-2">
        <div>{{ item.fname }} {{ item.lname }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { effect, ref } from 'vue'
import { getAllTeacher } from '@/api/teacher'

const teacherList = ref(0)

async function getAllTeacherInfo() {
  const techerInfo = await getAllTeacher()
  teacherList.value = techerInfo.data?.result
}

effect(() => {
  getAllTeacherInfo()
})
</script>
