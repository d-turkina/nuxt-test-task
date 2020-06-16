<template>
	<nuxt-link
		:to="`/projects/${id}`"
		class="link"
	>
		<div class="project-item">
			<img
				:src="logoURL"
				class="project-item__logo"
			/>
			<span class="project-item__name">{{ name }}</span>
			<span
				:class="`project-item__status${isActive ? ' project-item__status_active' : ' project-item__status_in-active'}`"
			>
				{{ isActive ? 'Active' : 'Inactive' }}
			</span>
			<div class="project-item-info">
				<div class="project-item-info">
					<div class="project-item-info-row">
						<div class="project-item-info-row__label">time this week:</div>
						<div class="project-item-info-row__content">{{ formatTime(spentTimeWeek) }}</div>
					</div>
					<div class="project-item-info-row">
						<div class="project-item-info-row__label">time month:</div>
						<div class="project-item-info-row__content">{{ formatTime(spentTimeMonth) }}</div>
					</div>
					<div class="project-item-info-row">
						<div class="project-item-info-row__label">total:</div>
						<div class="project-item-info-row__content">{{ formatTime(spentTimeAll) }}</div>
					</div>
				</div>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
	import logoPlaceholder from "~/assets/images/logo-placeholder.png";
	
	export default {
		name: 'ProjectItem',
		props: {
			id: {
				type: Number,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			logoURL: {
				type: String,
				default: logoPlaceholder
			},
			isActive: {
				type: Number,
				required: true
			},
			spentTimeWeek: {
				type: Number,
				required: true
			},
			spentTimeMonth: {
				type: Number,
				required: true
			},
			spentTimeAll: {
				type: Number,
				required: true
			}
		},
		methods: {
			formatTime(time = 0) {
				const timeInDate = new Date(time * 1000);
				const hours = timeInDate.getUTCHours().toString().padStart(2, '0');
				const minutes = timeInDate.getUTCMinutes().toString().padStart(2, '0');
				const seconds = timeInDate.getSeconds().toString().padStart(2, '0');
				
				return [hours, minutes, seconds].join(':');
			}
		}
	}
</script>

<style lang="scss">
	.project {
		&-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			background-color: #FFFFFF;
			border: 2px solid #EAEAEA;
			padding: 15px 30px;
			margin-bottom: 10px;
			border-radius: 2px;
			font-size: 18px;

			&__logo {
				width: 55px;
				height: 55px;
			}

			&__name {
				flex-basis: 25%;
				font-weight: 700;
			}

			&__status {
				flex-basis: 10%;
				font-weight: 700;

				&_active {
					color: #008000;
				}

				&_in-active {
					color: #888888;
				}
			}

			&-info {
				display: flex;
				flex-direction: column;
				justify-self: end;
				flex-basis: 45%;

				&-row {
					display: flex;
					justify-content: space-between;

					&__label {
						margin-right: 10px;
					}

					&__content {
						font-weight: 600;
					}
				}
			}
		}
	}

	.link {
		text-decoration: none;
		color: #000000;
	}

	@media (min-width: 576px) {
		.project-item {
			flex-direction: row;
			padding: 35px 30px;
		}

		.project-item-info {
			flex-basis: 40%;
		}

		.project-item__status {
			flex-basis: 10%;
		}
	}

	@media (min-width: 768px) {
		.project-item-info {
			flex-basis: 35%;
		}

		.project-item__status {
			flex-basis: 10%;
		}
	}

	@media (min-width: 992px) {
		.project-item-info {
			flex-basis: 25%;
		}

		.project-item__status {
			flex-basis: 15%;
		}
	}

	@media (min-width: 1200px) {
		.project-item__status {
			flex-basis: 15%;
		}
	}
</style>