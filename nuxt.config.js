require("dotenv").config();

export default {
	mode: "spa",

	env: {
		apiUrl: process.env.API_URL || "http://localhost:8090",
	},

	/*
  ** Headers of the page
  */
	head: {
		// title: "evlad.me",
		titleTemplate: "Deathmatch Lookup - %s",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "Find the best CSGO Deathmatch servers for EU, CIS, NA, SA and OC." },
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
