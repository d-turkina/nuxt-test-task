<template>
	<div class="auth">
		<div class="auth-form">
			<div class="auth-form-item">
				<div class="auth-form__title">Login</div>
			</div>
			<div class="auth-form-item">
				<ui-input
					v-model="email"
					:validated="isEmailValid"
					type="email"
					placeholder="Email"
				/>
			</div>
			<div class="auth-form-item">
				<ui-input
					v-model="password"
					:validated="isPasswordValid"
					type="password"
					placeholder="Password"
				/>
			</div>
			<div class="auth-form-item">
				<ui-button
					:disabled="loginInProgress"
					color="primary"
					@click="onSubmit"
				>
					Login
				</ui-button>
			</div>
		</div>
		<ui-notification
			:show="loginError"
			color="error"
		>
			{{ loginErrorMessage }}
		</ui-notification>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	
	import UINotification from "~/components/UI/UINotification";
	import UIButton from "~/components/UI/UIButton";
	import UIInput from "~/components/UI/UIInput";
	
	export default {
		name: 'AuthorizationPage',
		middleware({ req, redirect }) {
			let token;
			
			if (process.server) {
				const cookieString = req.headers.cookie || '';
				const tokenCookie = cookieString.split(';').map(c => c.trim()).find(c => c.startsWith('token='));
				
				token = tokenCookie && tokenCookie.split('=')[1];
			} else {
				token = Cookies.get('token');
			}
			if (token) {
				redirect('/projects')
			}
		},
		data() {
			return {
				email: '',
				password: '',
				isEmailValid: true,
				isPasswordValid: true,
				loginInProgress: false,
				loginError: false,
				loginErrorMessage: '',
			}
		},
		components: {
			'ui-button': UIButton,
			'ui-input': UIInput,
			'ui-notification': UINotification
		},
		watch: {
			email() {
				this.isEmailValid = true
			},
			password() {
				this.isPasswordValid = true
			}
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
			validateEmail(email) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			},
			validatePassword(password) {
				return password.length;
			},
			validateForm() {
				if (!this.validateEmail(this.email)) this.isEmailValid = false;
				if (!this.validatePassword(this.password)) this.isPasswordValid = false;
				return this.validateEmail(this.email) && this.validatePassword(this.password);
			},
			onEnter(e) {
				if (e.key === 'Enter') this.onSubmit();
			},
			onSubmit() {
				if (this.validateForm()) {
					this.loginInProgress = true;
					this.$axios.post(
						`/auth/login`,
						{
							email: this.email,
							password: this.password
						},
						{
							headers: {
								'Content-Type': 'application/json',
								'Client-Timezone-Offset': '60',
								'Client-Language': 'ru-RU',
								'Client-Company': 'udimiteam',
								'Client-Device': 'desktop'
							}
						}
					)
					.then(res => {
						Cookies.set('token', res.data.token);
						this.$nuxt.$router.push('/projects');
						this.loginInProgress = false;
					})
					.catch(err => {
						this.loginInProgress = false;
						console.warn(err)
						if (err.response) {
							this.loginErrorMessage = err.response.data.first_errors.email;
						} else {
							this.loginErrorMessage = 'Connection error';
						}
						this.loginError = true;
						
						setTimeout(() => {
							this.loginError = false;
						}, 3000);
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.auth {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;

		&-form {
			flex-basis: 80%;

			&__title {
				font-size: 24px;
				font-weight: 700;
				text-transform: uppercase;
			}

			&-item {
				padding: 5px 0;
			}
		}
	}

	@media (min-width: 576px) {
		.auth-form {
			flex-basis: 70%;
		}
	}

	@media (min-width: 768px) {
		.auth-form {
			flex-basis: 60%;
		}
	}

	@media (min-width: 992px) {
		.auth-form {
			flex-basis: 45%;
		}
	}

	@media (min-width: 1200px) {
		.auth-form {
			flex-basis: 30%;
		}
	}
</style>