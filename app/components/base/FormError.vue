<script lang="ts" setup>
import type { ErrorObject } from '@vuelidate/core'

interface Props {
	errors: ErrorObject[]
}

defineProps<Props>()
</script>
<template>
	<div :class="{ error: errors.length }">
		<slot />

		<div class="input-errors" v-for="error of errors" :key="error.$uid">
			<div class="error-msg text-red-500 text-xs mt-1">
				{{ error.$message }}
			</div>
		</div>
	</div>
</template>
