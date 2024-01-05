<template>
  <div class="w-2/3 my-0 mx-auto">
    <div class="p-2" v-for="item in list" :key="item.order_id">
      <div>Order ID: {{ item.order_id }}</div>
      <div>Price: {{ item.price }}</div>
      <div>Meeting time: {{ dayjs(item.meeting_time, 'x').format('YYYY-MM-DD HH:mm:ss') }}</div>
      <div>Meeting name: {{ item.meeting_teacher_fname }} {{ item.meeting_teacher_lname }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { OrderService } from '@/api'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/user'

const user = useUserStore()

const list = ref([])

const getOrderList = async () => {
  const { code, result } = await OrderService.getOrders<any>()
  if (code === 0 && result?.length > 0) {
    list.value = result
  }
}

getOrderList()
</script>

<style lang="scss" scoped>
.order-list {
  top: auto;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  width: 300px;
  height: 420px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #e3e5e7;
  color: #333;
  font-size: 14px;
  overflow: overlay;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 8px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #f2f2f2;
  }

  /*定义滑块 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background-color: #f6f6f6;
  }

  /* 定义内层轨道 滚动条中间部分 */
  &::-webkit-scrollbar-track-piece {
    background-color: #fafafa;
  }
}
</style>
