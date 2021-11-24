import regions from "~/utils/regions.json";
import networks from "~/utils/networks.json";
import maps from "~/utils/maps.json";

export default {
	data() {
		return {
			regions,
			networks,
			maps,
		};
	},

	methods: {
		toggleLoading() {
			this.isLoading = !this.isLoading;
		},
		togglePageLoading() {
			this.isLoading = !this.isLoading;
		},
	},
};
