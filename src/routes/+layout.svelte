<script lang="ts">
	import '../app.css';
	import { Toaster } from '@skeletonlabs/skeleton-svelte';
	import { toastFactory } from '$lib/components/toaster/Toaster';

	let { children } = $props();
</script>

<div class="h-svh bg-[#dcb98c]">
	{@render children()}
	<Toaster toaster={toastFactory} />
</div>
