<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const loginInput = ref({
	email: '',
	password: '',
})

const loading = ref(false)

const rules = {
	email: { required, email }, // Matches state.firstName
	password: { required }, // Matches state.lastName
}

const v$ = useVuelidate(rules, loginInput)

const router = useRouter()
const userCookie: any = useCookie('user', userCookieSettings)

const submitInput = async () => {
	const isValid = await v$.value.$validate()

	console.log('isValid=', isValid)

	if (!isValid) return

	try {
		loading.value = true
		const res: any = await $fetch('/api/auth/login', {
			method: 'POST',
			body: loginInput.value,
		})

		loading.value = false
		const userRole = res?.data?.user?.role
		if (userRole === 'CUSTOMER') {
			userCookie.value = res
			router.push('/')
		} else {
			console.log(res)
			userCookie.value = res
			router.push('/admin/dashboard')
		}
	} catch (error) {
		loading.value = false
		showLoginOrSignUpError(error)
	}
}

definePageMeta({
	layout: 'auth',
})
</script>

<template>
	<div class="bg-white h-screen">
		<div class="flex justify-between">
			<div></div>
			<div class="w-[300px] mt-20">
				<div class="flex flex-col gap-2">
					<h1 class="text-2xl mb-3">Sign In</h1>

					<FormError :errors="v$.email.$errors">
						<BaseInput
							v-model="loginInput.email"
							:type="'text'"
							:placeholder="'info@gmail.com'"
							name="email"
						/>
					</FormError>

					<FormError :errors="v$.password.$errors">
						<BaseInput
							v-model="loginInput.password"
							:type="'password'"
							:placeholder="'password'"
							name="password"
						/>
					</FormError>

					<BaseBtn
						@click="submitInput"
						:loading="loading"
						label="Sign in"
					></BaseBtn>
					<p
						class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-start"
					>
						Dont have an account ?
						<NuxtLink
							to="/auth/signup"
							class="text-indigo-500 hover:text-brand-600 font-semibold"
							>Sign up</NuxtLink
						>
					</p>
				</div>
			</div>
			<div></div>
		</div>
	</div>
</template>
