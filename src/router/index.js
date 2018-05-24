import Vue from 'vue';
import Router from 'vue-router';
import Room from '@/components/room/room';
import Order from '@/components/order/order';
import Login from '@/components/login/login';
import MyOrder from '@/components/myOrder/myOrder';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/room',
			name: 'room',
			component: Room
		},
		{
			path: '/order',
			name: 'order',
			component: Order
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/myOrder',
			name: 'myOrder',
			component: MyOrder
		}
	]
});
