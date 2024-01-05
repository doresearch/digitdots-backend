<template>
  <div class="w-300 mx-auto text-xl pt-20 bg-white">
    <div class="border p-10">
      <div class="font-bold text-3xl text-center mb-8">Make Sure Order</div>
      <Descript
        class="font-bold text-2xl"
        label="teacher"
        label-class="w-30"
        :content="`${orderDetail.meeting_teacher_fname} ${orderDetail.meeting_teacher_lname}`"
      />
      <Descript
        class="text-success-dark pt-4"
        label-class="w-30"
        label="time"
        :content="dayjs(orderDetail.meeting_time, 'x')"
      />
      <Descript class="font-bold text-success-dark pt-4" label-class="w-30" label="price">
        <Price :price="orderDetail.price" />
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
import OrderService, { findByMeetingId } from '@/api/order'
import { useRoute } from 'vue-router'
import { effect, ref } from 'vue'
import dayjs from 'dayjs'
import paypal from 'paypal'
import request from '@/axios/request'

const { query } = useRoute()

const meetingInfo = ref({})

const orderDetail = ref({
  meeting_id: '',
  meeting_teacher_fname: '',
  meeting_teacher_id: '',
  meeting_teacher_lname: '',
  meeting_time: '',
  order_id: '',
  order_status: 0,
  order_time: '',
  price: 0,
})

async function getData() {
  const res = await findByMeetingId({
    meetingId: query.meetingId as string,
  })

  meetingInfo.value = res.data.result
}

const getOrderDetails = async () => {
  const { code, result } = await OrderService.getOrderDetail<any>({ order_id: query.orderId as string })
  console.log(result)
  orderDetail.value = result
}

effect(() => {
  getData()
  setTimeout(() => {
    paypal
      .Buttons({
        createOrder() {
          return request
            .bodyPost<any>('/order/create-paypal-order', {
              cart: [
                {
                  sku: query.orderId,
                  quantity: 1,
                },
              ],
            })
            .then(response => response.data.result.id)
        },
        onApprove(data) {
          // This function captures the funds from the transaction.
          return request
            .bodyPost<any>('/order/capture', { orderID: data.orderID })
            .then(response => response.data.result)
            .then(details => {
              // This function shows a transaction success message to your buyer.
              alert('Transaction completed by ' + details.payer.name.given_name)
            })
        },
        onCancel(data) {
          // Show a cancel page, or return to cart
          console.log('onCancel', data)
        },
        onError(err) {
          // For example, redirect to a specific error page
          console.log('onError', err)
        },
      })
      .render('#paypal-button-container')
  }, 100)
})

getOrderDetails()
</script>
