// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Toasted from 'vue-toasted';
// import VueTouchRipple from 'vue-touch-ripple';
// import 'vue-touch-ripple/dist/vue-touch-ripple.css';

import isPc from 'common/js/isPc';
import 'common/stylus/index.styl';
if (isPc() == 'phone') {
	require.ensure([], () => {
		require('common/js/flexible');
	});
} else {
	document.querySelector('html').style.fontSize = '108px';
}

// Vue.use(VueTouchRipple, {
// 	color: '#fff',
// 	opacity: 0.4,
// 	speed: 1.2,
// 	transition: 'ease'
// });
document.body.addEventListener('touchstart', function() {});
Vue.use(Toasted, {
	position: 'top-left',
	duration: 3000
});
window.eventBus = new Vue();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
});
