<template>
	<div>
		<!-- #Left Sidebar ==================== -->
		<!-- <dl-sidebar></dl-sidebar> -->
		<Sidebar :menus="menus"></Sidebar>

		<!-- #Main ============================ -->
		<div class="page-container">
			<Topbar></Topbar>

			<!-- ### $App Screen Content ### -->
			<main class='main-content bgc-grey-100'>
				<div id='mainContent'>
					<router-view></router-view>
				</div>
			</main>
			<DlFooter></DlFooter>
		</div>
	</div>
</template>

<script>
import Sidebar from './partials/Sidebar.vue';
import Topbar from './partials/Topbar.vue';
import DlFooter from './partials/DlFooter.vue';
import Example from './Example.vue';

export default {
	components: {
		Sidebar,
		Topbar,
		Example,
		DlFooter
	},
	data () {
		return {
			userdata: [],
			menus: [
				{
					title: 'Home',
					icon: 'ti-home',
					to: {name:'home'},
					externalLink: 0,
					menus: []
				},
				{
					title: 'Management',
					icon: 'ti-briefcase',
					to: '',
					externalLink: 0,
					menus: [
						{
							title: 'Permission',
							icon: null,
							to: {name:'permission'},
							externalLink: 0,
							menus: []
						}
					]
				}
			]
		}
	},

	mounted () {
		axios.get('/dashboard/api/user.json')
		.then(
			success => {
				this.userdata = success.data;
			}, 
			error => {
				console.log(error);
			}
		)
	}
}
</script>