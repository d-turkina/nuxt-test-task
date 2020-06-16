<template>
	<div>
		<Navigation/>
		<nuxt/>
	</div>
</template>

<script>
	import Navigation from "~/components/Common/Navigation";
	
	export default {
		name: 'InnerPage',
		components: {
			Navigation
		}
	}
</script>

<style lang="scss">

</style>
