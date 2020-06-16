<template>
	<div class="navigation">
		<ui-button
			size="small"
			@click="back()"
		>
			Back
		</ui-button>
	</div>
</template>

<script>
	import UIButton from "~/components/UI/UIButton";
	
	export default {
		name: 'Navigation',
		components: {
			'ui-button': UIButton
		},
		methods: {
			back() {
				this.$nuxt.$router.push('/projects');
			}
		}
	}
</script>

<style lang="scss">
	.navigation {
		display: flex;
		align-items: center;
		box-shadow: inset #888888 0 2px 3px -2px;
		background-color: #C7CED7;
		height: 80px;
		padding: 0 35px;
		margin-top: 15px;
	}
</style>