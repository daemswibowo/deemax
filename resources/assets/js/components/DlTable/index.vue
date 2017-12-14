<template>
	<table class="table table-striped">
		<thead>
			<tr>
				<th v-for="c in columns">{{ c }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(d, key) in data" :index="key">
				<td v-if="increment">{{ key+1 }} </td>
				<td v-for="field in d">{{ field }}</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	export default {
		props: ['columns','increment','data']
	}
</script>