<template>
	<div class="project-page">
		<div class="project-form">
			<div class="project-form-element">
				<div class="project-form-element__label">Name</div>
				<div class="project-form-element-control">
					<ui-input
						v-model="name"
						size="small"
						placeholder="Project name"
					/>
					<ui-button
						color="primary"
						size="small"
						:disabled="updatingInProgress"
						class="project-form-element-control__submit"
						@click="onSubmit"
					>
						Ok
					</ui-button>
				</div>
			</div>
		</div>
		<ui-notification
			color="success"
			:show="updatingSuccess"
		>
			New name successfully saved
		</ui-notification>
		<ui-notification
			color="error"
			:show="updatingError"
		>
			<p>{{ updatingErrorMessage }}</p>
		</ui-notification>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	
	import UINotification from "~/components/UI/UINotification";
	import UIButton from "~/components/UI/UIButton";
	import UIInput from "~/components/UI/UIInput";
	
	export default {
		name: 'ProjectPage',
		layout: 'inner-page',
		middleware: ['accessChecker'],
		components: {
			'ui-button': UIButton,
			'ui-input': UIInput,
			'ui-notification': UINotification
		},
		validate({ params }) {
			return /^[0-9]*$/.test(params.id)
		},
		data() {
			return {
				updatingInProgress: false,
				updatingSuccess: false,
				updatingError: false,
				updatingErrorMessage: '',
			}
		},
		asyncData({ $axios, params, req }) {
			let token;
			if (process.server) {
				token = req.headers.cookie
				.split(';')
				.map(cookie => cookie.trim())
				.find(cookie => cookie.startsWith('token='))
				.split('=')[1];
			} else {
				token = Cookies.get('token');
			}
			
			return $axios.get(
				`/projects-manage/${params.id}`,
				{ headers: { 'Authorization': `Bearer ${token}` } }
			)
			.then(response => {
				const { id, name } = response.data.project;
				return { id, name }
			})
			.catch(console.warn);
		},
		mounted() {
			if (process.client) {
				window.addEventListener('keydown', this.onEnter);
			}
		},
		beforeDestroy() {
			if (process.client) {
				window.removeEventListener('keydown', this.onEnter);
			}
		},
		methods: {
			onEnter(e) {
				if (e.key === 'Enter') this.onSubmit();
			},
			onSubmit() {
				this.updatingInProgress = true;
				const token = Cookies.get('token');
				
				this.$axios.post(
					`/projects-manage/update?id=${this.id}`,
					{ name: this.name },
					{
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					}
				)
				.then(() => {
					this.updatingInProgress = false;
					this.updatingSuccess = true;
					setTimeout(() => {
						this.updatingSuccess = false;
					}, 3000)
				})
				.catch(err => {
					this.updatingInProgress = false;
					console.warn(err);
					if (err.response) {
						this.updatingErrorMessage = err.response.data.first_errors.name;
					} else {
						this.updatingErrorMessage = 'Connection error';
					}
					this.updatingError = true;
					setTimeout(() => {
						this.updatingError = false;
					}, 3000)
				});
			}
		}
	}
</script>

<style lang="scss">
	.project {
		&-page {
			width: 100%;
			height: 100%;
		}

		&-form {
			display: flex;
			flex-direction: column;
			padding: 15px;
			margin: 15px;
			background-color: #FFFFFF;
			border: 1px solid #EAEAEA;
			border-radius: 3px;

			&-element {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				&__label {
					flex-basis: 15%;
				}

				&-control {
					display: flex;
					flex-basis: 65%;
					align-items: center;

					&__submit {
						margin-left: 10px;
					}
				}
			}
		}
	}

	@media (min-width: 576px) {
		.project-form {
			padding: 35px;
			margin: 35px
		}
		.project-form-element {
			flex-direction: row;
			align-items: center;
		}
	}
</style>