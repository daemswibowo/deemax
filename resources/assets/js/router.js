import Vue from 'vue'
import VueRouter from 'vue-router';
import Example from './components/Example.vue';
import Home from './pages/home/Home.vue';
import Notfound from './components/Notfound.vue';

import Management from './pages/management';
import Permission from './pages/management/permission';
import Role from './pages/management/role';
Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	linkActiveClass: 'active',
	base: 'dashboard',
	routes: [
		{ 
			path: '/', 
			redirect: {name:'home'},
		},
		{ 
			path: '/home', 
			component: Home,
			name: 'home'
		},
		{ 
			path: '/management', 
			component: Management,
			redirect: {name:'permission'},
			children: [
				{
					path: 'permission',
					component: Permission,
					name: 'permission'
				},
				{
					path: 'role',
					component: Role,
					name: 'role'
				}
			]
		},
		{ 
			path: '*', 
			component: Notfound,
		}
	]
});