// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-typed-router'],

	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	pinia: {
		storesDirs: ['./stores/**'],
	},
})
