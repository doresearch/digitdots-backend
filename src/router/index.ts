import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register/index.vue'
import Login from '@/views/Login.vue'
import SetMyMeeting from '@/views/Setting/Meeting/index.vue'
import TeacherIntroduce from '@/views/Book/TeacherIntroduce/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // Wix HomePage
    // The UK 、 USA
    component: Home,
  },
  {
    path: '/united-kingdom',
    name: 'unitedKingdom',
    component: () => import('@/views/UnitedKingdom.vue'),
  },
  {
    path: '/united-states',
    name: 'unitedStates',
    component: () => import('@/views/UnitedStates.vue'),
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('@/views/Booking.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  // 注册页面
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  // 老师登陆完成后选择时间
  {
    path: '/setting/my-metting',
    name: 'setting',
    component: SetMyMeeting,
  },
  // 老师介绍页面（后置）
  {
    path: '/teacher-introduce',
    name: 'TeacherIntroduce',
    component: TeacherIntroduce,
  },
  // 商品列表页面（UK、USA）
  // 下单页面
  {
    path: '/order-detail',
    name: 'orderDetail',
    component: () => import('@/views/Book/OrderDetailInfo/index.vue'),
  },
  // 订单详情
  // 支付页面
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
