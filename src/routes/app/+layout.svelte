<script lang="ts">
	import AppHeader from '$lib/components/layout/AppHeader.svelte';
	import BottomNavigation from '$lib/components/layout/BottomNavigation.svelte';
	import { walletState } from '$lib/state/WalletState.svelte';
	import { connectMetamaskWallet } from '$lib/blockchain/wallet/connect';

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
	<footer>
		<BottomNavigation />
	</footer>

	<!-- Overlay if wallet not connected -->
	{#if !walletState.connected}
		<div
			class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-white backdrop-blur-sm"
		>
			<p class="mb-4 text-lg font-medium">☕ Wallet not connected</p>
			<p class="mb-6 px-8 text-sm opacity-80">
				Please reconnect MetaMask to continue ordering your coffee.
			</p>
			<button type="button" onclick={connectMetamaskWallet} class="btn preset-filled-secondary-500">
				Reconnect MetaMask
			</button>
		</div>
	{/if}
</div>
