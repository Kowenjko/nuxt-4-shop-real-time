// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'nuxt-typed-router',
		'@nuxt/image',
		'nuxt-nodemailer',
		'@vueuse/nuxt',
		'@unlok-co/nuxt-stripe',
		'@nuxt/icon',
	],
	nitro: {
		replace: {
			'import * as process': 'import * as processUnused',
		},
		experimental: {
			websocket: true,
		},
	},

	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	icon: {
		mode: 'css',
		cssLayer: 'base',
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	tailwindcss: { exposeConfig: true },
	nodemailer: {
		from: '"Nuxt 4 Shop" <noreply@app.com>',
		host: process.env.MAIL_HOST,
		port: Number(process.env.MAIL_PORT),
		secure: false,
		auth: {
			user: process.env.MAIL_TRAP_USER,
			pass: process.env.MAIL_TRAP_PASSWORD,
		},
	},

	runtimeConfig: {
		//private: is accessible only on the server
		JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY,
		REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		DIRECT_URL: process.env.DIRECT_URL,
		public: {},
	},
	stripe: {
		// Server
		server: {
			key: process.env.STRIPE_SECRET_KEY,
			options: {},
		},
		client: {
			key: process.env.STRIPE_PUBLIC_KEY,
			options: {},
		},
	},
})
