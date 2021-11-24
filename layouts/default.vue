<template>
	<div class="columns is-multiline is-gapless is-fullheight">
		<div class="column is-12">
			<b-navbar
				type="is-main-bg-darker"
				wrapper-class="container">
				<template slot="brand">
					<b-navbar-item
						tag="router-link"
						to="/">
						<img
							src="/images/logo.png"
							alt="dm">
					</b-navbar-item>
				</template>
				<template slot="start">
					<b-navbar-item
						tag="router-link"
						to="/">
						Home
					</b-navbar-item>
					<b-navbar-item
						tag="router-link"
						to="/feedback">
						Feedback
					</b-navbar-item>
					<b-navbar-item
						tag="router-link"
						to="/changelog">
						<span>
							<span
								v-if="isChangelogNew"
								title="Badge top right"
								class="badge is-right navbar-badge has-text-white">new</span>
							Changelog
						</span>
					</b-navbar-item>
				</template>

				<template slot="end">
					<b-navbar-item
						tag="a"
						href="https://twitter.com/imevlad">
						<p>
							made with 🧡 by <span class="has-text-weight-bold">evlad</span>
						</p>
					</b-navbar-item>
				</template>
			</b-navbar>
		</div>
		<div class="column is-12 is-full-page-height">
			<nuxt />
		</div>

		<!-- <div class="column is-12">
			<footer class="footer">
				<div class="content has-text-centered">
					<p>
						<strong>Aimfrag</strong> by <a
							href="https://twitter.com/imevlad"
							target="_blank">evlad</a>.
					</p>
				</div>
			</footer>
		</div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			lastChangelog: new Date("2021-01-02"),
			items: [
				{
					title: "Home",
					icon: "home",
					to: { name: "index" },
				},
				{
					title: "Inspire",
					icon: "lightbulb",
					to: { name: "inspire" },
				},
			],
		};
	},

	computed: {
		isChangelogNew() {
			if (process.browser) {
				return !!(new Date(localStorage.last_changelog_visit).getTime()) ? new Date(localStorage.last_changelog_visit) < this.lastChangelog : true;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
	.navbar-badge {
		top: 25%;
    right: 10%;
	}
</style>
