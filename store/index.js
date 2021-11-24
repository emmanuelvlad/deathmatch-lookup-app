import regions from "~/utils/regions.json";
import networks from "~/utils/networks.json";
import maps from "~/utils/maps.json";

const parseOrDefault = (toParse, defaultValue = {}) => {
	try {
		const parsed = JSON.parse(toParse);
		if (parsed.constructor === Object) return parsed;
	} catch (_) {
		return defaultValue;
	}
};

export const state = () => {
	const countries = {};
	regions.forEach(region => {
		const countryRet = {};
		region.countries.forEach(country => {
			const localCountries = parseOrDefault(localStorage.countries);
			countryRet[country.code] = localCountries[region.code] && localCountries[region.code].hasOwnProperty(country.code) ? localCountries[region.code][country.code] : true;
		});
		countries[region.code] = countryRet;
	});

	const networksObject = {};
	networks.forEach(network => {
		const localNetworks = parseOrDefault(localStorage.networks);
		networksObject[network] = localNetworks.hasOwnProperty(network) ? localNetworks[network] : true;
	});

	const mapsObject = {};
	maps.forEach(map => {
		const localMaps = parseOrDefault(localStorage.maps);
		mapsObject[map] = localMaps.hasOwnProperty(map) ? localMaps[map] : true;
	});

	const localTabs = parseOrDefault(localStorage.tabs);

	return {
		options: {
			region: localStorage.region ?? regions[0].code,
			countries,
			maps: mapsObject,
			networks: networksObject,
			tabs: {
				countries: localTabs.countries ?? false,
				networks: localTabs.networks ?? false,
				maps: localTabs.maps ?? true,
			},
		},
	};
};

export const mutations = {
	SET_REGION: (state, payload) => {
		localStorage.region = payload;
		state.options.region = payload;
	},
	OPEN_TAB: (state, payload) => {
		const localTabs = parseOrDefault(localStorage.tabs, state.options.tabs);

		state.options.tabs[payload] = true;

		localTabs[payload] = true;
		localStorage.tabs = JSON.stringify(localTabs);
	},
	CLOSE_TAB: (state, payload) => {
		const localTabs = parseOrDefault(localStorage.tabs, state.options.tabs);

		state.options.tabs[payload] = false;

		localTabs[payload] = false;
		localStorage.tabs = JSON.stringify(localTabs);
	},
	TOGGLE_COUNTRY: (state, payload) => {
		if (state.options.countries[state.options.region].hasOwnProperty(payload)) {
			const localCountries = parseOrDefault(localStorage.countries, state.options.countries);

			if (!localCountries[state.options.region]) {
				localCountries[state.options.region] = state.options.countries[state.options.region];
			} else if (!localCountries[state.options.region].hasOwnProperty(payload)) {
				localCountries[state.options.region][payload] = state.options.countries[state.options.region][payload];
			}

			state.options.countries[state.options.region][payload] = !state.options.countries[state.options.region][payload];

			localCountries[state.options.region][payload] = state.options.countries[state.options.region][payload];
			localStorage.countries = JSON.stringify(localCountries);
		}
	},
	TOGGLE_NETWORK: (state, payload) => {
		const localNetworks = parseOrDefault(localStorage.networks, state.options.networks);

		state.options.networks[payload] = !state.options.networks[payload];

		localNetworks[payload] = state.options.networks[payload];
		localStorage.networks = JSON.stringify(localNetworks);
	},
	TOGGLE_MAP: (state, payload) => {
		const localMaps = parseOrDefault(localStorage.maps, state.options.maps);

		state.options.maps[payload] = !state.options.maps[payload];

		localMaps[payload] = state.options.maps[payload];
		localStorage.maps = JSON.stringify(localMaps);
	},
};

export const actions = {
	async getServers({ state }, { gamemode, params }) {
		const data = await this.$axios.get(`${process.env.apiUrl}/${state.options.region.toLowerCase()}/${gamemode}`, {
			params: {
				...params,
				countries: Object.keys(state.options.countries[state.options.region]).filter(c => state.options.countries[state.options.region][c]),
				networks: Object.keys(state.options.networks).filter(n => state.options.networks[n]),
				maps: Object.keys(state.options.maps).filter(m => state.options.maps[m]),
			},
		}).then(res => res.data);
		return data;
	},
};
