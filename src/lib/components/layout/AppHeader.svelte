<script lang="ts">
	import { switchOrAddUniMaChain } from '$lib/blockchain/wallet/connect';
	import { walletState } from '$lib/state/WalletState.svelte';
	import { CoffeeIcon } from '@lucide/svelte';
	import { formatEther } from 'viem';

	// Utility to shorten the address for display
	const shorten = (addr: string) => addr.slice(0, 6) + '...' + addr.slice(-4);

	const formatShortBalance = (balance: bigint | null, symbol = 'UMETH'): string => {
		if (!balance) return `0.0000 ${symbol}`;
		return `${Number(formatEther(balance)).toFixed(4)} ${symbol}`;
	};
</script>

<header>
	<nav class="rounded-b-xl border-gray-200 bg-white px-4 py-2.5 lg:px-6 dark:bg-gray-800">
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
			<a href="/" class="flex items-center">
				<CoffeeIcon class="mb-1 text-amber-700" />
				<span class="ml-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white"
					>BlockCaffeine</span
				>
			</a>

			<div class="flex items-center lg:order-2">
				{#if walletState.connected}
					<div class="flex flex-col items-end text-xs text-gray-700 sm:text-sm dark:text-white">
						<span class="font-medium">Connected: {shorten(walletState.account)}</span>
						{#if walletState.balance}
							<span class="opacity-70">
								Balance: {formatShortBalance(walletState.balance)}
							</span>
						{/if}
					</div>
				{:else}
					<button
						onclick={switchOrAddUniMaChain}
						class="rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
					>
						Reconnect Wallet
					</button>
				{/if}
			</div>
		</div>
	</nav>
</header>
