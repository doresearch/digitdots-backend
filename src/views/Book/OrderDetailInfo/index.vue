<template>
  <div class="w-300 mx-auto text-xl pt-20 bg-white">
    <div class="border p-10">
      <div class="font-bold text-3xl text-center mb-8">Make Sure Order</div>
      <Descript
        class="font-bold text-2xl"
        label="teacher"
        label-class="w-30"
        :content="`${meetingInfo.user_fname} ${meetingInfo.user_lname}`"
      />
      <Descript
        class="text-success-dark pt-4"
        label-class="w-30"
        label="time"
        :content="dayjs(meetingInfo.order_time, 'x')"
      />
      <Descript class="font-bold text-success-dark pt-4" label-class="w-30" label="price">
        <Price :price="meetingInfo.price" />
      </Descript>
      <Descript class="text-info pt-4" label-class="w-30 mt-1" label="discount">
        <el-input placeholder="" />
      </Descript>
      <div class="text-info flex justify-center pt-12">
        <div id="paypal-button-container"></div>
        <!-- <el-button type="success" plain>Make Sure</el-button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Descript from '@/components/Descript.vue'
import Price from '@/components/Price.vue'
import { findByMeetingId } from '../../../api/order'
import { useRoute } from 'vue-router'
import { effect, ref } from 'vue'
import dayjs from 'dayjs'
import paypal from 'paypal'

const { query } = useRoute()

const meetingInfo = ref({})

async function getData() {
  const res = await findByMeetingId({
    meetingId: query.meetingId as string,
  })

  meetingInfo.value = res.data.result
}

effect(() => {
  getData()
  setTimeout(() => {
    paypal.Buttons().render('#paypal-button-container')
  }, 100)
})
</script>
