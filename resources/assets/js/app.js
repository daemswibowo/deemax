require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueHead from 'vue-head'
import BootstrapVue from 'bootstrap-vue'

import App from './components/App.vue';
import Example from './components/Example.vue';
import Home from './pages/home/Home.vue';

if (localStorage.getItem('sidebar-collapsed') == 1) {
	$('.app').addClass('is-collapsed');
} else {
	$('.app').removeClass('is-collapsed');	
}

Vue.use(BootstrapVue);  
Vue.use(VueRouter);
Vue.use(VueHead)

Vue.mixin({
	data: function() {
		return {
			dimas: 'Aku anak sehat'
		}
	}
})

const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'active',
	base: 'dashboard',
	routes: [
		{ path: '/', redirect: 'home' },
		{ path: '/home', component: Home },
		{ path: '/example', component: Example },
	]
});

const app = new Vue({
	el: '#app',
	components: {
		App
	},
	router
});
