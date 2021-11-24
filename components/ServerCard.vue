<template>
	<div
		class="server-card"
		:style="`background-image: url(/images/maps/${serverMap}.jpg)`">
		<div class="content is-relative is-flex is-flex-direction-column is-fullheight">
			<!-- Header -->
			<div class="columns is-flex-1">
				<div class="column is-12">
					<div class="columns is-mobile">
						<div class="column has-text-left">
							<p
								class="title is-5"
								style="margin-bottom: .9em;">
								{{ serverData.server.network }}
							</p>
							<p class="subtitle is-7 has-text-weight-semibold has-text-white">{{ serverData.map }}</p>
						</div>

						<div class="column is-narrow">
							<img
								:src="`/images/flags/${serverData.server.country}.png`"
								:alt="serverData.server.country">
						</div>
					</div>
				</div>
			</div>
			<!-- Center -->
			<div class="columns is-mobile is-centered is-vcentered is-flex-1">
				<div class="column is-10 is-relative">
					<p class="server-slot has-text-centered has-text-weight-medium">
						<span
							class="has-text-weight-bold"
							:class="serverData.players >= serverData.max_players / 2 ? serverData.players === serverData.max_players - 1 ? 'has-text-primary' : 'has-text-success' : 'has-text-gray-1'">
							{{ serverData.players }}
						</span>/{{ serverData.max_players }}
					</p>
					<b-field>
						<b-input
							expanded
							v-clipboard="`connect ${serverConnect};`"
							v-clipboard:success="successCopy"
							:value="`connect ${serverConnect};`"
							disabled
							size="is-small"
							custom-class="connect-input cursor-pointer">
						</b-input>
						<p class="control">
							<b-button
								class="button is-success connect-button"
								tag="a"
								size="is-small"
								:href="`steam://connect/${serverConnect}`">
								<span class="is-size-6 has-text-weight-semibold">
									Join
								</span>
							</b-button>
						</p>
					</b-field>
				</div>
			</div>
			<!-- Bottom -->
			<div class="columns is-flex-1 is-align-items-flex-end">
				<div class="column is-12">
					<div class="columns">
						<div class="column">
							<div class="is-flex is-justify-content-space-around is-align-items-center">
								<b-tooltip
									label="Prime"
									type="is-secondary">
									<div
										class="server-tag"
										:class="{ 'is-active': !!serverData.server.tags.find(t => t === 'prime')}">
										<img src="/images/misc/prime.svg">
									</div>
								</b-tooltip>

								<b-tooltip
									label="No sound"
									type="is-secondary">
									<div
										class="server-tag is-small"
										:class="{ 'is-active': !!serverData.server.tags.find(t => t === 'no sound')}">
										<img src="/images/misc/icon-sound-off.svg">
									</div>
								</b-tooltip>

								<b-tooltip
									label="HS Only"
									type="is-secondary">
									<div
										class="server-tag"
										:class="{ 'is-active': !!serverData.server.tags.find(t => t === 'hs')}">
										<img src="/images/misc/icon_headshot.svg">
									</div>
								</b-tooltip>

								<b-tooltip
									label="NO AWP"
									type="is-secondary">
									<div
										class="server-tag"
										:class="{ 'is-active': !!serverData.server.tags.find(t => t === 'no awp')}">
										<img src="/images/weapons/awp.svg">
									</div>
								</b-tooltip>
							</div>
						</div>

						<div class="column is-narrow is-hidden-touch">
							<b-tooltip label="Work in progress">
								<b-rate
									:disabled="true"
									:value="3.5" />
							</b-tooltip>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ServerCard",
	props: {
		serverData: {
			type: Object,
			required: true,
		},
	},

	methods: {
		successCopy() {
			this.$buefy.toast.open({
				message: "Connect copied in your clipboard",
				position: "is-bottom",
				type: "is-success",
			});
		},
		connectTo(address) {
			location.href = address;
		},
	},

	computed: {
		serverConnect() {
			return `${this.serverData.server.host}:${this.serverData.server.port}`;
		},

		serverMap() {
			const split = this.serverData.map.split("/");
			return split[split.length - 1];
		},

		playersCountColor() {
			return this.serverMap.players >= this.serverMap.max_players / 2 ? (this.serverMap.players === this.serverMap.max_players - 1 ? "primary" : "success") : "gray-2";
		},
	},
};
</script>

<style lang="scss">
@import "~/assets/scss/colors.scss";

.server-card {
	&::before {
		content: " ";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.65);
		height: 100%;
		z-index: 0;
		border-radius: 10px;
	}

	position: relative;
	border-radius: 10px;
	background-position: center;
	background-size: cover;
	height: 196px;

	>.content {
		padding: 0.75rem;
	}
}

.connect-input {
	color: #fff !important;
	font-weight: bold;
	border: 0 !important;
	text-align: center;
	background-color: rgba(23, 23, 30, 0.5) !important;
	border-radius: 5px 0 0 5px !important;
}

.connect-button {
	border-radius: 0 5px 5px 0 !important;
}

.server-slot {
	color: #fff;
	position: absolute;
	bottom: 2rem;
	left: 0;
	right: 0;
}

.network-name {
	font-weight: bold;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.server-tag {
	>img {
		height: 1.25rem;
		vertical-align: middle;
	}

	&.is-small > img {
		height: 1rem;
	}

	&.is-active {
		opacity: 1;
	}

	opacity: 0.1;
}
</style>
