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
	],

	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	pinia: {
		storesDirs: ['./stores/**'],
	},

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
})
