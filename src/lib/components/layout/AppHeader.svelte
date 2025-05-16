<script lang="ts">
	import { switchOrAddUniMaChain } from '$lib/blockchain/wallet/connect';
	import { walletState } from '$lib/state/WalletState.svelte';
	import { Link } from '@lucide/svelte';
	import { formatEther } from 'viem';
	import Logo from '$lib/assets/coffee_icon_transparent.svg';

	// Utility to shorten the address for display
	const shorten = (addr: string) => addr.slice(0, 6) + '...' + addr.slice(-4);

	const formatShortBalance = (balance: bigint | null, symbol = 'UMETH'): string => {
		if (!balance) return `0.0000 ${symbol}`;
		return `${Number(formatEther(balance)).toFixed(4)} ${symbol}`;
	};
</script>

<header>
	<nav class="rounded-b-xl border-gray-200 bg-white px-4 py-2.5 lg:px-6">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
			<a href="/app" class="flex items-center">
				<img alt="Logo of BlockCaffeine" class="mb-2 h-10 w-10" src={Logo} />
				<span class="ml-1 self-center text-xl font-semibold whitespace-nowrap">BlockCaffeine</span>
			</a>

			<div class="flex items-center lg:order-2">
				{#if walletState.connected}
					<div class="flex flex-col items-end text-xs text-gray-700 sm:text-sm">
						<div class="flex flex-row gap-1">
							<Link class="h-4 w-4 text-green-700" />
							<span class="font-medium">Connected: {shorten(walletState.account)}</span>
						</div>
						{#if walletState.balance}
							<span class="opacity-70">
								Balance: {formatShortBalance(walletState.balance)}
							</span>
						{/if}
					</div>
				{:else}
					<button
						onclick={switchOrAddUniMaChain}
						class="rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none"
					>
						Reconnect Wallet
					</button>
				{/if}
			</div>
		</div>
	</nav>
</header>
