require('./bootstrap');
import Vue from 'vue';
import VueHead from 'vue-head'
import BootstrapVue from 'bootstrap-vue'
import App from './components/App.vue';
import Notfound from './components/Notfound.vue';
import router from './router';
import Paginate from 'vuejs-paginate'
import VSelect from 'vue-select';
if (localStorage.getItem('sidebar-collapsed') == 1) {
	$('.app').addClass('is-collapsed');
} else {
	$('.app').removeClass('is-collapsed');	
}
require('select2');

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
	},
	watch: {
		value: function (value) {
			$(this.$el).val(value)
		},
		options: function (options) {
			$(this.$el).empty().select2({ data: options })
		}
	},
	destroyed () {
		$(this.$el).off().select2('destroy');
	}
});


Vue.component('spinkit-three-bounce', require('./components/spinkit/ThreeBounce.vue'));
Vue.component('Notfound', Notfound);
Vue.component('v-select', VSelect);
const app = new Vue({
	el: '#app',
	components: {
		App
	},
	router,
});
