<script lang="ts">
	import '../app.css';
	import { Toaster } from '@skeletonlabs/skeleton-svelte';
	import { toastFactory } from '$lib/components/toaster/Toaster';

	let { children } = $props();
</script>

<div class="bg-primary-100-900 h-svh">
	{@render children()}
	<Toaster toaster={toastFactory} />
</div>
