import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Register from '@/views/Register/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // Wix HomePage
    // The UK 、 USA
    component: Home,
  },
  // 注册页面
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  // 老师登陆完成后选择时间
  // 老师介绍页面（后置）
  // 商品列表页面（UK、USA）
  // 下单页面
  // 订单详情
  // 支付页面
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
