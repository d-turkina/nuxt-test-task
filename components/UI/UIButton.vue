<template>
	<button
		:class="buttonClasses"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot/>
	</button>
</template>

<script>
	export default {
		name: 'UIButton',
		props: {
			size: {
				type: String,
				default: 'default'
			},
			color: {
				type: String,
				default: 'default'
			}
		},
		computed: {
			buttonClasses() {
				const classes = ['button'];
				switch (this.size) {
					case 'small':
						classes.push('small-size');
						break;
					default:
						classes.push('default-size');
				}
				
				switch (this.color) {
					case 'primary':
						classes.push('primary-style');
						break;
					default:
						classes.push('default-style');
				}
				
				return classes.join(' ');
			}
		}
	}
</script>

<style scoped lang="scss">
	.button {
		background-color: #39547B;
		font-size: 14px;
		font-weight: 500;
		text-transform: uppercase;
		height: 50px;
		border-radius: 5px;
		border: 1px solid #C6C6C6;
		color: #FFFFFF;
		outline: none;
		cursor: pointer;
	}

	.button:disabled {
		cursor: default;
		opacity: .6;
	}

	.small-size {
		padding: 10px 25px;
	}

	.default-size {
		padding: 10px 50px;
	}

	.default-style {
		background-color: #D6D6D6;
		color: #000000;
		font-weight: 600;
	}

	.primary-style {
		text-shadow: #000000 2px 2px 2px;
		background-color: #39547B;
		color: #FFFFFF;
	}
</style>