require("dotenv").config();

const title = "CSGO DM Servers";
const description = "Find the best CSGO Deathmatch servers, Rifle, Multicfg, HS only, Pistol, for EU, CIS, NA, SA and OC.";
const path = "https://dm.evlad.me/";

export default {
	mode: "spa",

	env: {
		apiUrl: process.env.API_URL || "http://localhost:8090",
	},

	/*
  ** Headers of the page
  */
	head: {
		title,
		titleTemplate: "%s - CSGO Deathmatch servers",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ itemprop: "name", content: title },
			{ itemprop: "description", content: description },
			{ hid: "description", name: "description", content: description, },

			{ key: "og:title", property: "og:title", content: title },
			{ key: "og:site_name", property: "og:site_name", content: title },
			{ key: "og:description", property: "og:description", content: description },
			{ key: "og:type", property: "og:type", content: "website" },
			{ key: "og:url", property: "og:url", content: path },

			{ key: "twitter:title", name: "twitter:title", content: title },
			{ key: "twitter:description", name: "twitter:description", content: description },
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" },
		],
	},
	/*
  ** Customize the progress-bar color
  */
	loading: { color: "#fff" },
	/*
  ** Global CSS
  */
	css: [
		"~/assets/scss/main.scss",
	],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		"~/plugins/clipboard.js",
	],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		"@nuxtjs/eslint-module",
		"@aceforth/nuxt-netlify",
		["@nuxtjs/google-analytics", {
			id: "UA-79190543-3",
		}],
	],
	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://buefy.github.io/#/documentation
		"nuxt-buefy",
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		// Doc: https://github.com/nuxt-community/dotenv-module
		"@nuxtjs/dotenv",
	],
	/*
	** Buefy
	*/
	buefy: {
		css: false,
		// materialDesignIcons: false,
	},
	/*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
	axios: {
	},
	/*
  ** Build configuration
  */
	build: {
		extractCSS: true,
		/*
    ** You can extend webpack config here
    */
		extend() {
		},
	},
};
