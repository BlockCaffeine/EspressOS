<script lang="ts">
	import '../app.css';
	import { Toaster } from '@skeletonlabs/skeleton-svelte';
	import { toastFactory } from '$lib/components/toaster/Toaster';

	let { children } = $props();
</script>

<div class="h-svh bg-[#FAF9F6]">
	{@render children()}
	<script lang="ts">
		import { Toaster } from '@skeletonlabs/skeleton-svelte';
		import { toastFactory } from '$lib/components/toaster/Toaster';
	</script>

	<Toaster
		toaster={toastFactory}
		base="fixed z-50 flex flex-row gap-4"
		width="max-w-sm w-full"
		padding="p-4"
		rounded="rounded-lg"
		classes="shadow-sm"
		titleBase="font-semibold text-base text-gray-900"
		descriptionBase="mt-1 text-sm leading-relaxed text-gray-700"
		descriptionClasses="opacity-60 px-2 pt-1"
		btnDismissBase="ml-4 flex-shrink-0"
		btnDismissClasses="text-red-500 hover:text-red-700"
		stateError="bg-red-50 border-l-4 border-red-600 text-red-800"
		stateSuccess="bg-green-50 border-l-4 border-green-600 text-green-800"
		stateWarning="bg-yellow-50 border-l-4 border-yellow-600 text-yellow-800"
		stateInfo="bg-blue-50 border-l-4 border-blue-600 text-blue-800"
	/>
</div>
