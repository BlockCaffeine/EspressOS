<script lang="ts">
	import { fly } from 'svelte/transition';
	import MetamaskIcon from '$lib/components/wallet/MetaMaskIcon.svelte';
	import { Avatar, ProgressRing } from '@skeletonlabs/skeleton-svelte';
	import { connectMetamaskWallet } from '$lib/blockchain/wallet/connect';
	import { walletState } from '$lib/state/WalletState.svelte';
	import { goto } from '$app/navigation';

	$effect(() => {
		if (walletState.connected && walletState.account.startsWith('0x')) {
			goto('/app/shop');
		}
	});
</script>

<section
	in:fly={{ y: 1000, delay: 750, duration: 750 }}
	class="card border-surface-200-800 divide-surface-200-800 block w-10/12 divide-y border-[1px] bg-white shadow-2xl"
>
	<header class="flex flex-col items-center gap-2 p-4">
		<h3 class="h3">Connect Wallet</h3>
		<small class="text-center tracking-tighter opacity-60">
			You need a wallet to reach behind this wall, we don't want brokies.
		</small>
	</header>

	<div class="my-2 flex justify-center space-y-4 p-4">
		{#if walletState.isConnecting}
			<ProgressRing
				value={null}
				size="size-14"
				meterStroke="stroke-tertiary-600-400"
				trackStroke="stroke-tertiary-50-950"
			/>
		{:else}
			<button
				type="button"
				class="btn flex w-10/12 justify-between rounded-4xl bg-[#DCC6AE] p-3"
				onclick={connectMetamaskWallet}
			>
				<Avatar name="Metamask Logo" background="bg-primary-900-100">
					<MetamaskIcon width={36} />
				</Avatar>
				<h3 class="h3 flex items-center pr-3 text-[#6f512a]">Metamask</h3>
			</button>
		{/if}
	</div>

	<footer class="flex flex-col items-center justify-between gap-4 p-4">
		<small class="text-center tracking-tighter opacity-60">
			By connecting your wallet, you agree to give team BlockCaffeine free coffee as long as they're
			students.
		</small>
	</footer>
</section>
