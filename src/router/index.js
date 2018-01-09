import Vue from 'vue'
import Router from 'vue-router'
import Room from '@/components/room/room'
import Order from '@/components/order/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/room'
    },
    {
      path:'/room',
      name:'room',
      component:Room
    },
    {
      path:'/order',
      name:'order',
      component:Order
    }
  ]
})
