<template>
	<div class="columns is-multiline">
		<div class="column is-12 has-text-centered">
			<!-- Type -->
			<div class="m-top-1 columns is-centered is-multiline">
				<div class="column is-12">
					<p class="title is-6 has-text-grey-light">Type</p>
				</div>
				<template>
					<div
						v-for="(type, name, index) in types"
						:key="index"
						class="column is-6 is-3-widescreen">
						<TypeBox
							:type="name"
							:title="type.title"
							:image="type.image"
							:selected.sync="selectedType" />
					</div>
				</template>
			</div>

			<!-- Options -->
			<div
				ref="options"
				class="m-top-1 columns is-centered is-multiline is-mobile is-justify-content-center">
				<template v-if="readyToSearch">
					<div class="column is-12">
						<p class="title is-6 has-text-grey-light">Options</p>
					</div>
					<!-- AWP -->
					<template v-for="(option, index) in optionsByType">
						<div
							:key="index"
							class="column is-narrow">
							<OptionBox
								:variable.sync="options[option].value"
								:title="options[option].name"
								:image="options[option].image" />
						</div>
					</template>
				</template>
			</div>

			<!-- Search -->
			<div
				v-if="readyToSearch"
				class="m-top-3">
				<div class="columns">
					<div class="column is-12">
						<b-button
							type="is-success"
							size="is-medium"
							:loading="loading"
							@click="searchForServers">
							Look up for servers
						</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OptionBox from "~/components/OptionBox";
import RegionBox from "~/components/RegionBox";
import TypeBox from "~/components/TypeBox";

export default {
	components: {
		OptionBox,
		RegionBox,
		TypeBox,
	},

	props: {
		loading: Boolean,
		error: String,
	},

	data() {
		return {
			types: {
				rifle: {
					title: "Rifle",
					image: "/images/weapons/ak47.svg",
				},
				pistol: {
					title: "Pistol",
					image: "/images/weapons/usp_silencer.svg",
				},
				// awp: {
				// 	title: "AWP",
				// 	image: "/images/weapons/awp.svg",
				// },
				multicfg: {
					title: "Multicfg",
					image: "/images/misc/armsrace.svg",
				},
			},
			selectedType: null,
			options: {
				prime: {
					name: "Prime",
					tag: "prime",
					value: "only",
					image: "misc/prime.svg",
				},
				noAwp: {
					name: "NO AWP",
					tag: "no awp",
					value: "all",
					image: "weapons/awp.svg",
				},
				headshot: {
					name: "HS only",
					tag: "hs",
					value: "all",
					image: "misc/icon_headshot.svg",
				},
				noSound: {
					name: "No sound",
					tag: "no sound",
					value: "all",
					image: "misc/icon-sound-off.svg",
				},
			},
			queryData: null,
		};
	},

	computed: {
		optionsByType() {
			if (!this.selectedType) return;

			let options = Object.keys(this.options);
			switch(this.selectedType) {
			case "awp":
			case "multicfg":
				options = ["prime", "noSound"];
				break;
			case "pistol":
				options.splice(options.indexOf("noAwp"), 1);
				break;
			}
			return options;
		},
		optionsToTag() {
			let tags = {};
			this.optionsByType.forEach(el => tags[this.options[el].tag] = this.options[el].value);
			return tags;
		},
		readyToSearch() {
			return ["pistol", "rifle", "multicfg", "awp"].includes(this.selectedType);
		},
	},

	methods: {
		getClass(variable, comp) {
			return { "selected": this[variable] === comp, "unselected": this[variable] !== comp && this[variable] !== null };
		},
		async searchForServers() {
			this.$emit("update:error", null);

			this.$emit("update:loading", true);

			const queryParams = {
				type: this.selectedType,
				tags: this.optionsToTag,
			};

			try {
				this.$emit("servers", await this.$store.dispatch("getServers", { gamemode: "dm", params: queryParams }));
				// this.queryData = await this.$store.dispatch("getServers", { region: this.selectedRegion, gamemode: "dm", params: queryParams });
			} catch (_) {
				this.$emit("update:error", "Network error, please try again later");
			} finally {
				this.$emit("update:loading", false);
			}
		},
	},

	watch: {
		selectedType() {
			this.queryData = null;
			this.$nextTick(() => {
				window.scroll({ top: 0, behavior: "smooth" });
				this.$parent.$refs.gamemode.scroll({ top: this.$parent.$refs.gamemode.scrollHeight, behavior: "smooth" });
			});
		},
	},
};
</script>
