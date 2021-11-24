<template>
	<div class="columns is-multiline is-mobile">
		<!-- Region -->
		<div class="column is-12">
			<span class="has-text-weight-bold">Region</span>
			<b-dropdown
				:value="options.region"
				expanded
				aria-role="list"
				class="is-fullwidth region-drop"
				@change="$store.commit('SET_REGION', $event)">
				<button
					class="button is-fullwidth has-text-black"
					style="justify-content: space-between;"
					type="button"
					slot="trigger">
					<div class="media">
						<img
							class="media-left"
							:src="`/images/flags/regions/${options.region.toLowerCase()}.png`"
							:alt="options.region" />
						<span class="media-content has-text-weight-semibold">{{ options.region }}</span>
					</div>
					<b-icon icon="menu-down"></b-icon>
				</button>

				<b-dropdown-item
					v-for="(region, index) in regions"
					:key="index"
					:value="region.code"
					aria-role="listitem">
					<div class="media has-text-black">
						<img
							class="media-left"
							:src="`/images/flags/regions/${region.code.toLowerCase()}.png`"
							:alt="region.name" />
						<div class="media-content">
							<p class="has-text-weight-bold">{{ region.code }}</p>
						</div>
					</div>
				</b-dropdown-item>
			</b-dropdown>
		</div>
		<!-- Countries -->
		<div class="column is-12">
			<b-collapse
				:open="options.tabs.countries"
				aria-id="mapsOption"
				@open="$store.commit('OPEN_TAB', 'countries')"
				@close="$store.commit('CLOSE_TAB', 'countries')">
				<div
					class="columns is-mobile has-text-weight-bold"
					slot="trigger"
					aria-controls="mapsOption"
					slot-scope="props"
					:class="props.open ? 'has-text-main-bg-lighter' : ''">
					<div class="column">Countries</div>
					<div class="column is-narrow">
						<b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
					</div>
				</div>
				<div
					v-for="(country, index) in regions.find(r => r.code === options.region).countries"
					:key="index"
					class="field">
					<b-checkbox
						:value="options.countries[options.region][country.code]"
						size="is-small"
						type="is-secondary"
						@input="$store.commit('TOGGLE_COUNTRY', country.code)">
						{{ country.name }}
					</b-checkbox>
				</div>
			</b-collapse>
		</div>
		<!-- Networks -->
		<div class="column is-12">
			<b-collapse
				:open="options.tabs.networks"
				aria-id="mapsOption"
				@open="$store.commit('OPEN_TAB', 'networks')"
				@close="$store.commit('CLOSE_TAB', 'networks')">
				<div
					class="columns is-mobile has-text-weight-bold"
					slot="trigger"
					aria-controls="mapsOption"
					slot-scope="props"
					:class="props.open ? 'has-text-main-bg-lighter' : ''">
					<div class="column">Networks</div>
					<div class="column is-narrow">
						<b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
					</div>
				</div>
				<div
					v-for="(network, index) in networks"
					:key="index"
					class="field">
					<b-checkbox
						:value="options.networks[network]"
						size="is-small"
						type="is-secondary"
						@input="$store.commit('TOGGLE_NETWORK', network)">
						{{ network }}
					</b-checkbox>
				</div>
			</b-collapse>
		</div>
		<!-- Maps -->
		<div class="column is-12">
			<b-collapse
				:open="options.tabs.maps"
				aria-id="mapsOption"
				@open="$store.commit('OPEN_TAB', 'maps')"
				@close="$store.commit('CLOSE_TAB', 'maps')">
				<div
					class="columns is-mobile has-text-weight-bold"
					slot="trigger"
					aria-controls="mapsOption"
					slot-scope="props"
					:class="props.open ? 'has-text-main-bg-lighter' : ''">
					<div class="column">Maps</div>
					<div class="column is-narrow">
						<b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
					</div>
				</div>
				<div class="columns is-multiline">
					<div
						v-for="(map, index) in maps"
						:key="index"
						class="column is-12">
						<div
							class="crop cursor-pointer"
							@click="$store.commit('TOGGLE_MAP', map)">
							<div
								class="crop-content"
								:class="{ 'is-active': options.maps[map] }">
								<span class="has-text-weight-bold">{{ map }}</span>
							</div>
							<img
								:src="`/images/maps/${map}.jpg`"
								:alt="map" />
						</div>
					</div>
				</div>
			</b-collapse>
		</div>
	</div>
</template>

<script>
import utils from "~/mixins/utils";

export default {
	name: "OptionsColumn",

	mixins: [utils],

	computed: {
		options() {
			return this.$store.state.options;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/colors.scss";

.region-drop {
	margin-top: .5rem;

	button, .dropdown-item {
		padding: 0.35rem 0.75rem !important;
	}

	.media-left {
		align-self: center;
		margin-right: 0.5rem !important;
	}
}

.crop {
	user-select: none;
	position: relative;
	width: 100%;
	height: 35px;
	overflow: hidden;
	border-radius: 5px;
	.crop-content {
		position: absolute;
		display: flex;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		justify-content: center;
    align-items: center;
    color: white;
		background-color: rgba(0, 0, 0, 0.5);
		&.is-active {
			background-color: rgba(0, 200, 0, 0.25);
		}
	}
	img {
		margin: -15px 0 0 0;
	}
}
</style>
