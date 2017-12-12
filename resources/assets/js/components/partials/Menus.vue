<template>
	<ul :class="ulClass">
		<li v-for="m in menus" class="nav-item" :class="{'dropdown':m.menus.length>0}" router-link-active='active'>
			<router-link v-if="!m.externalLink" :to="m.to" :class="{'dropdown-toggle':m.menus.length>0}">
				<span class="icon-holder">
					<i :class="m.icon"></i>
				</span>
				<span class="title">{{ m.title }}</span>
				<span v-if="m.menus.length>0" class="arrow">
					<i class="ti-angle-right"></i>
				</span>
			</router-link>
			<a v-else :href="m.to" :class="{'dropdown-toggle':m.menus.length>0}">
				<span class="icon-holder">
					<i :class="m.icon"></i>
				</span>
				<span class="title">{{ m.title }}</span>
				<span v-if="m.menus.length>0" class="arrow">
					<i class="ti-angle-right"></i>
				</span>
			</a>
			<Menus v-if="m.menus.length>0" ulClass="dropdown-menu" :menus="m.menus"></Menus>
		</li>
	</ul>
</template>

<script>
export default {
	props: ['menus','ulClass'],
	beforeCreate: function () {
		this.$options.components.Menus = require('./Menus.vue')
	}
}
</script>