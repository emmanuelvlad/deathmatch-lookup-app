<template>
	<section class="section container">
		<div class="columns is-multiline is-centered">
			<div class="column is-12 has-text-centered">
				<h1 class="title has-text-grey-lighter">Changelog</h1>
			</div>

			<div class="column is-6">
				<div class="columns is-multiline is-variable is-3">
					<div
						v-for="(changelog, index) in changelogs"
						:key="index"
						class="column is-12">
						<div class="content changelog">
							<p class="title is-4">
								{{ changelog.date }}
							</p>

							<div v-if="changelog.message">
								<p
									v-for="(message, index) in changelog.message"
									:key="'message-' + index">
									{{ message }}&nbsp;
								</p>
							</div>

							<div v-if="changelog.added">
								<p class="is-size-5 has-text-main-bg-lighter">
									Add
								</p>
								<ul>
									<li
										v-for="(value, index) in changelog.added"
										:key="'added-' + index">
										{{ value }}
									</li>
								</ul>
							</div>

							<div v-if="changelog.changed">
								<p class="is-size-5 has-text-main-bg-lighter">
									Change
								</p>
								<ul>
									<li
										v-for="(value, index) in changelog.changed"
										:key="'changed-' + index">
										{{ value }}
									</li>
								</ul>
							</div>

							<div v-if="changelog.fixed">
								<p class="is-size-5 has-text-main-bg-lighter">
									Fix
								</p>
								<ul>
									<li
										v-for="(value, index) in changelog.fixed"
										:key="'fixed-' + index">
										{{ value }}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	mounted() {
		localStorage.last_changelog_visit = new Date().toISOString();
	},
	data() {
		return {
			changelogs: [
				{
					date: "02 January 2021",
					added: [
						"Options are now collapsable",
					],
					changed: [
						"Better responsiveness for every displays",
					],
				},
				{
					date: "01 January 2021",
					message: [
						"Happy new year 🎉",
						"",
						"This year I wish to add new features to the platform, here are my thoughts",
						"",
						"- Being able to add/manage your own servers and network",
						"- Along side with it, a rating system in order to keep only the best servers",
						"",
						"Maybe in a distant future an universal subscription to have VIP access to all the servers available on the platform.",
						"This could benefit alot to the server owners and also to the player, always having solid servers available",
						"",
						"Don't be shy to write me a feedback 😊",
					],
					changed: [
						"Redesigned the server cards",
					],
				},
				{
					date: "07 August 2020",
					added: [
						"New filters added: countries, networks and maps",
						"Filters are locally saved and will persist on refresh",
					],
					changed: [
						"Updated overall design",
					],
					fixed: [
						"The majority of servers have been updated to match the options",
					],
				},
				{
					date: "02 August 2020",
					added: [
						"Added new region \"SA\"",
						"Added 19 new servers on EU, NA, SA and CIS (WarmupServer.net)",
					],
					changed: [
						"Changed NA and OC flags",
					],
				},
				{
					date: "28 June 2020",
					added: [
						"Added 12 new servers on NA (Tarik.GG)",
						"Changed region `RU` to `CIS`",
					],
					fixed: [
						"Adjusted reserved slots on CYBERSHOKE servers",
					],
				},
			],
		};
	},
	head: {
		title: "Changelog",
	},
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.content.changelog {
	background: $main-bg-darker;
	padding: 1.5rem;
	border-radius: 10px;
	>div:not(:last-child) {
		margin-bottom: 2rem;
		>p {
			margin-bottom: 0;
		}
		>ul {
			list-style: disc;
		}
	}
}
</style>
