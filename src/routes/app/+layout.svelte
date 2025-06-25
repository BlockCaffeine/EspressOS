<script lang="ts">
	import AppHeader from '$lib/components/layout/AppHeader.svelte';
	import BottomNavigation from '$lib/components/layout/BottomNavigation.svelte';
	import { walletState } from '$lib/state/WalletState.svelte';
	import DisconnectOverlay from '$lib/components/layout/DisconnectOverlay.svelte';

	let { children } = $props();
</script>

<!-- Flex-col with sticky header/footer, main scrolls -->
<div class="relative flex min-h-screen flex-col">
	<!-- Header -->
	<header class="sticky top-0 z-10 backdrop-blur-md">
		<AppHeader />
	</header>

	<!-- Main Content: grows and scrolls internally -->
	<main
		class="flex-1 space-y-4 overflow-auto p-4 transition-opacity duration-300
      {walletState.connected ? '' : 'pointer-events-none opacity-50 select-none'}"
	>
		{@render children()}
	</main>

	<!-- Bottom Navigation -->
	<footer class="sticky bottom-0 z-50">
		<BottomNavigation />
	</footer>

	<!-- Overlay when wallet disconnected -->
	<DisconnectOverlay />
</div>
