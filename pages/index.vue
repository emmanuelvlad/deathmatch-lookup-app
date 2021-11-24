<template>
	<div
		class="columns is-multiline is-mobile is-marginless is-flex is-fullheight"
		style="flex-flow: column;">
		<!-- <div
			class="column is-12"
			style="height: 3.75rem">
			<div class="columns has-text-centered is-mobile">
				<div class="column is-4 has-background-secondary cursor-pointer">
					<span class="title">Deathmatch</span>
				</div>
				<div
					class="column is-4 category-borders cursor-not-allowed"
					style="background: #A7A7BC;">
					<span class="title">Retake</span>
				</div>
				<div
					class="column is-4 cursor-not-allowed"
					style="background: #A7A7BC">
					<span class="title">Execute</span>
				</div>
			</div>
		</div> -->
		<div class="column is-12 is-paddingless server-lookup-content">
			<div class="columns is-marginless is-fullheight is-mobile is-multiline">
				<div
					ref="gamemode"
					class="column is-fullheight"
					style="overflow: auto;">
					<Deathmatch
						:loading.sync="loading"
						:error.sync="error"
						@servers="serversLoaded" />
				</div>

				<div
					class="column is-paddingless is-narrow is-relative has-background-main-bg-light is-fullheight options-collapse"
					:class="{ 'collapsed': optionsCollapsed }">
					<div
						class="options-collapse-button"
						@click="optionsCollapsed = !optionsCollapsed">
						<b-icon
							:icon="optionsCollapsed ? 'arrow-left' : 'arrow-right'" />
					</div>
					<div
						class="columns is-gapless is-fullheight custom-scrollbar"
						:class="{ 'is-hidden': optionsCollapsed }"
						style="overflow: hidden auto;">
						<div class="column is-12">
							<div class="options-container">
								<OptionsColumn />
							</div>
						</div>
					</div>
				</div>


				<div
					ref="servers"
					class="column is-12-touch is-5-desktop is-5-fullhd has-background-main-bg-dark has-text-centered is-fullheight servers"
					:class="{ 'is-hidden-touch': !servers && !error }"
					style="overflow: auto;">
					<!-- Template results -->


					<div
						v-show="loading"
						style="position: relative; width: 100%; height: 100%;">
						<b-loading
							:is-full-page="false"
							:active.sync="loading" />
					</div>
					<template v-if="!loading">
						<template v-if="!error && servers">
							<template v-if="!servers.data.length">
								<div class="is-fullheight no-server">
									<b-icon
										icon="emoticon-sad-outline"
										size="is-huge" />
									<p class="title has-text-grey-light has-text-weight-medium">
										Sorry, no server found
									</p>
									<p class="subtitle has-text-main-bg"><nuxt-link to="feedback">Add new servers</nuxt-link></p>
								</div>
							</template>
							<template v-else>
								<div class="mb-5 has-text-grey">
									<p>
										<span>Total: {{ servers.count.total }}</span> -
										<span>Full: {{ servers.count.full }}</span> -
										<span>Empty: {{ servers.count.empty }}</span> -
										<span>Failed: {{ servers.count.failed }}
											<b-tooltip
												v-show="servers.count.failed > 0"
												label="Server may be down or the request was blocked, try running the query again"
												type="is-white"
												position="is-bottom">
												<b-icon
													icon="help-circle"
													size="is-small" />
											</b-tooltip>
										</span>
									</p>
									<p>
										Found {{ servers.data.length }} servers
									</p>
								</div>
								<section
									class="section"
									style="padding-top: 0;">
									<div
										class="columns is-multiline is-centered">
										<div
											v-for="(server, index) in servers.data"
											class="column is-6 is-12-desktop is-6-fullhd"
											:key="index">
											<ServerCard :server-data="server" />
										</div>
									</div>
								</section>
							</template>
						</template>
						<template v-else-if="error">
							<p class="subtitle has-text-danger has-text-weight-bold">
								{{ error }}
							</p>
						</template>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ServerCard from "~/components/ServerCard";
import Deathmatch from "~/components/Deathmatch";
import OptionsColumn from "~/components/OptionsColumn";

import utils from "~/mixins/utils";

export default {
	components: {
		ServerCard,
		Deathmatch,
		OptionsColumn,
	},

	mixins: [utils],

	data() {
		return {
			servers: null,
			loading: false,
			error: null,
			optionsCollapsed: false,
		};
	},

	methods: {
		wakeup() {
			return this.$axios.get(`${process.env.apiUrl}/wake`);
		},

		serversLoaded(servers) {
			this.servers = servers;
			this.$nextTick(() => {
				this.$refs.servers.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
			});
		},
	},

	mounted() {
		this.wakeup();
		setTimeout(this.wakeup, 1740000);
	},

	watch: {
		error(value) {
			if (!value) return;
			this.$nextTick(() => {
				this.$refs.servers.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
			});
		},
	},


	head: {
		title: "by evlad",
	},
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.category-borders {
	border-left: 1px solid $secondary;
	border-right: 1px solid $secondary;
}

.no-server {
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}

.servers {
	@include until($desktop) {
		min-height: 100vh;
	}
}

.options-collapse {
	width: 148px !important;

	&.collapsed {
		width: 12px !important;
	}

	.options-collapse-button {
		position: absolute;
		display: flex;
		top: 0;
		left: -2rem;
		width: 2rem;
		height: 2rem;
		background-color: $main-bg-light;
		cursor: pointer;
		text-align: center;
		justify-content: center;
		align-items: center;

		&:hover {
			background-color: $main-bg-dark;
		}
	}

	.options-container {
		padding: 0.75rem;
	}
}
</style>
