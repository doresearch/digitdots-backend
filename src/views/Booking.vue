<template>
  <div>
    <div v-for="item in teacherList.result" :key="item.uid">
      <!-- <div>{{ item.fname }} {{ item.lname }}</div> -->

      <div>order</div>
    </div>
  </div>
</template>
<script>
import { effect, ref } from 'vue'
import { getAllTeacher } from '@/api/teacher'

const teacherList = ref({ result: [] })

async function getAllTeacherInfo() {
  const techerInfo = await getAllTeacher()
  teacherList.value = techerInfo.data
  console.log(teacherList.value, techerInfo.data)
}

effect(() => {
  getAllTeacherInfo()
})
</script>
