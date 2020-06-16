<template>
	<transition name="fade">
		<div
			v-show="show"
			:class="notificationClasses"
		>
			<slot/>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Notification',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: 'default'
			}
		},
		computed: {
			notificationClasses() {
				const classes = ['notification'];
				
				switch (this.color) {
					case 'success':
						classes.push('success');
						break;
					case 'error':
						classes.push('error');
						break;
					default:
						classes.push('default');
				}
				
				return classes.join(' ');
			}
		}
	}
</script>

<style scoped lang="scss">
	.notification {
		position: fixed;
		display: block;
		max-width: 300px;
		top: 30px;
		right: 20px;
		padding: 20px;
		border-radius: 5px;
		color: #FFFFFF;
		font-weight: 600;
	}

	.default {
		background-color: #607D8B;
	}

	.success {
		background-color: #4CAF50;
	}

	.error {
		background-color: #FF5252;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>