<template>
	<div>
		<Header/>
		<nuxt/>
	</div>
</template>

<script>
	import Header from "~/components/Common/Header";
	
	export default {
		name: 'Dashboard',
		components: {
			Header
		}
	}
</script>