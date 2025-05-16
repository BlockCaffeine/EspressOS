<script lang="ts">
	import AppHeader from '$lib/components/layout/AppHeader.svelte';
	import BottomNavigation from '$lib/components/layout/BottomNavigation.svelte';
	import { walletState } from '$lib/state/WalletState.svelte';
	import DisconnectOverlay from '$lib/components/layout/DisconnectOverlay.svelte';

	let { children } = $props();
</script>

<div class="relative grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="sticky top-0 z-10 backdrop-blur-md">
		<AppHeader />
	</header>
	<!-- Main Content -->
	<main
		class={`space-y-4 p-4 transition-opacity duration-300 ${walletState.connected ? '' : 'pointer-events-none opacity-50 select-none'}`}
	>
		{@render children()}
	</main>
	<!-- Bottom Navigation -->
	<footer class="sticky bottom-0 z-50">
		<BottomNavigation />
	</footer>

	<!-- Overlay if wallet not connected -->
	{#if !walletState.connected}
		<DisconnectOverlay />
	{/if}
</div>
