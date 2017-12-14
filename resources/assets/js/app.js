require('./bootstrap');
import Vue from 'vue';
import VueHead from 'vue-head'
import BootstrapVue from 'bootstrap-vue'
import App from './components/App.vue';
import Notfound from './components/Notfound.vue';
import router from './router';
import Paginate from 'vuejs-paginate'
if (localStorage.getItem('sidebar-collapsed') == 1) {
	$('.app').addClass('is-collapsed');
} else {
	$('.app').removeClass('is-collapsed');	
}

Vue.use(BootstrapVue);  
Vue.use(VueHead)
Vue.component('paginate', Paginate)

Vue.mixin({
	methods: {
		can (permission) {
			if (permission.constructor===Array) {
				permission.forEach(a => {
					console.log(a);
				})
			} else {
				console.log('can is not array');
			}
		},

		date (format, date='') {
			return moment(date).format(format);
		}
	}
});


Vue.component('spinkit-three-bounce', require('./components/spinkit/ThreeBounce.vue'));
Vue.component('Notfound', Notfound);
const app = new Vue({
	el: '#app',
	components: {
		App
	},
	router,
});
