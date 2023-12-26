<template>
  <div>
    <div class="font-bold text-3xl py-10">Get a tutorial with them</div>
    <div class="flex justify-center">
      <div class="p-4" v-for="item in teacherList" :key="item.uid">
        <img
          width="287"
          height="323"
          src="https://static.wixstatic.com/media/a3c153_cb8da2c95b7f4299b4ea2a150b7315a1~mv2.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/IMG_3981_edited.jpg"
          alt=""
        />
        <div class="text-2xl mt-2">{{ item.fname }} {{ item.lname }}</div>
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
