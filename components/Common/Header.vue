<template>
	<div class="header">
		<span class="header__logo">Q</span>
		<div class="menu">
			<nuxt-link
				class="menu__link"
				to="projects"
			>
				Projects
			</nuxt-link>
			<span
				@click="logout"
				class="menu__link"
			>
				Logout
			</span>
		</div>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	
	export default {
		name: 'Header',
		methods: {
			logout() {
				Cookies.remove('token');
				this.$nuxt.$router.push('/login');
			}
		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: #888888 0 1px 3px;
		background-color: #FFFFFF;
		height: 70px;
		margin-top: 10px;
		padding: 10px 20px;

		&__logo {
			font-size: 36px;
			font-weight: 700;
		}
	}

	.menu {
		display: flex;

		&__link {
			padding: 0 10px;
			text-transform: uppercase;
			text-decoration: none;
			color: #000000;
			cursor: pointer;
		}
	}
</style>