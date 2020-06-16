<template>
	<div class="projects">
		<div class="projects-list">
		<span
			v-if="!projects.length"
			class="no-projects"
		>
			No projects
		</span>
			<ProjectItem
				v-else
				v-for="project in projects"
				:key="project.id"
				:id="project.id"
				:name="project.name"
				:isActive="project.is_active"
				:logoURL="project.logo_url || undefined"
				:spentTimeWeek="project.spent_time_week"
				:spentTimeMonth="project.spent_time_month"
				:spentTimeAll="project.spent_time_all"
			/>
		</div>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	
	import ProjectItem from "~/components/Projects/ProjectItem";
	
	export default {
		name: 'ProjectsPage',
		layout: 'dashboard',
		middleware: ['accessChecker'],
		components: {
			ProjectItem
		},
		data() {
			return {
				projects: []
			}
		},
		asyncData({ $axios, req }) {
			let token;
			if (process.server) {
				const cookies = req.headers.cookie;
				token = cookies
				.split(';')
				.map(cookie => cookie.trim())
				.find(cookie => cookie.startsWith('token='))
				.split('=')[1];
			} else {
				token = Cookies.get('token')
			}
			
			return $axios.get(
				`/projects-manage/index`,
				{ headers: { 'Authorization': `Bearer ${token}` } }
			)
			.then(res => {
				return { projects: res.data.projects }
			})
			.catch(console.warn)
		}
	}
</script>

<style lang="scss">
	.projects {
		display: flex;
		justify-content: center;

		&-list {
			display: flex;
			flex-direction: column;
			width: 95%;
			margin-top: 25px;
		}
	}

	.no-projects {
		text-align: center;
		font-size: 36px;
		font-weight: 700;
	}

	@media (min-width: 576px) {
		.projects-list {
			width: 90%;
		}
	}

	@media (min-width: 768px) {
		.projects-list {
			width: 85%;
		}
	}

	@media (min-width: 992px) {
		.projects-list {
			width: 80%;
		}
	}

	@media (min-width: 1200px) {
		.projects-list {
			width: 70%;
		}
	}

</style>