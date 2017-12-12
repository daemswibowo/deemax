<template>
	<div class="sidebar">
		<div class="sidebar-inner">
			<div class="sidebar-logo">
				<div class="peers ai-c fxw-nw">
					<div class="peer peer-greed">
						<a class='sidebar-link td-n' href="/">
							<div class="peers ai-c fxw-nw">
								<div class="peer">
									<div class="logo">
										<img src="/assets/static/images/logo.png" alt="">
									</div>
								</div>
								<div class="peer peer-greed">
									<h5 class="lh-1 mB-0 logo-text">Deemax</h5>
								</div>
							</div>
						</a>
					</div>
					<div class="peer">
						<div class="mobile-toggle sidebar-toggle">
							<a href="javascript:void(0)" class="td-n">
								<i class="ti-arrow-circle-left"></i>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- ### $Sidebar Menu ### -->
			<Menus :menus="menus" ulClass="sidebar-menu scrollable pos-r"></Menus>
		</div>
	</div>
</template>

<script>
import Menus from './Menus.vue';
export default {
	props: ['menus'],
	components: {
		Menus
	}	
}
</script>

<style lang="scss" scoped>
.sidebar-dark {
	li.active {
		a {
			background: #444;
		}
	}
	li.open {
		a {
			color: #eee;
		}
	}

	li {
		a {
			color: #999;	
		}
		a:hover {
			color: #eee;
		}
		ul.dropdown-menu {
			li.open {
				a.dropdown-toggle {
					color: #eee;
				}
			}
			li {
				a {
					color: #999;	
				}
				a:hover {
					color: #eee;
				}
			}
		}
	}
}
</style>
