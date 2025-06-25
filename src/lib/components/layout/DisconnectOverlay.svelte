<script lang="ts">
	import { connectMetamaskWallet } from '$lib/blockchain/wallet/connect';
	import { walletState } from '$lib/state/WalletState.svelte';
</script>

{#if !walletState.connected}
	<div
		class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-white backdrop-blur-sm"
	>
		<p class="mb-4 text-lg font-medium">⛓️‍💥 Wallet not connected</p>
		<p class="mb-6 px-8 text-sm opacity-80">
			Please reconnect MetaMask to continue ordering your coffee.
		</p>
		<button type="button" onclick={connectMetamaskWallet} class="btn bg-[#DCC6AE]">
			Reconnect MetaMask
		</button>
	</div>
{/if}
