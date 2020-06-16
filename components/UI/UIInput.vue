<template>
	<input
		v-bind="$attrs"
		@input="$emit('input', $event.target.value)"
		:class="fieldClasses"
	/>
</template>

<script>
	export default {
		name: 'UIInput',
		props: {
			validated: {
				type: [Boolean, Number],
				default: true
			}
		},
		computed: {
			fieldClasses() {
				const classes = ['field'];
				if (!this.validated) classes.push('error');
				return classes.join(' ');
			}
		}
	}
</script>

<style scoped lang="scss">
	.field {
		display: block;
		width: 100%;
		padding: 15px;
		font-size: 18px;
		background-color: white;
		border: 1px solid #D3D3D3;
		border-radius: 2px;
	}

	.error {
		border: 1px solid #D92550;
		box-shadow: #D92550 0 0 3px;
	}
</style>