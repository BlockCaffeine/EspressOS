<script lang="ts">
	import { orderCoffee } from '$lib/blockchain/contracts/makeCoffee';
	import { formatReceipt } from '$lib/blockchain/helper/formatReceipt';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { toastFactory } from '../toaster/Toaster';
	import { shopState } from '$lib/state/ShopState.svelte';
	import MetaMaskIcon from '$lib/components/wallet/MetaMaskIcon.svelte';
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	import { goto } from '$app/navigation';

	let isStarting = false;
	let progress = 0;
	let machineReady = false;
	let timer: ReturnType<typeof setInterval>;

	// reset state whenever modal closes
	function handleOpenChange(e: { open: boolean }) {
		shopState.confirmationModalOpen = e.open;
		if (!e.open) {
			clearInterval(timer);
			isStarting = false;
			progress = 0;
			machineReady = false;
		}
	}

	function onConfirmNo() {
		// kick off 10s progress
		isStarting = true;
		progress = 0;
		machineReady = false;
		timer = setInterval(() => {
			progress += 1;
			if (progress >= 100) {
				clearInterval(timer);
				machineReady = true;
			}
		}, 100); // 100 ms * 100 = 10 s
	}

	async function onConfirmYes() {
		// user confirms machine is on (or they clicked the button after ready)
		shopState.confirmationModalOpen = false;
		try {
			const receipt = await orderCoffee();
			const summary = await formatReceipt(receipt);

			toastFactory.create({
				title: '☕ Coffee Ordered!',
				description: `Paid ${summary.amountUMETH} UMETH on ${new Date(
					summary.timestamp!
				).toLocaleString()}`,
				type: 'success',
				duration: 8000
			});
			goto('/app');
		} catch (err) {
			console.error(err);
			toastFactory.create({
				title: '🚨 Error Processing Order',
				description: 'Something went wrong. Please try again or check your wallet.',
				type: 'error'
			});
		}
	}
</script>

<Modal
	open={shopState.confirmationModalOpen}
	onOpenChange={handleOpenChange}
	contentBase="card bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto"
	triggerBase="flex w-full items-center justify-center gap-2 rounded-lg bg-[#dcb98c] py-3 font-semibold text-white transition"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}
		<MetaMaskIcon width="20" />
		<span>Pay with MetaMask</span>
	{/snippet}
	{#snippet content()}
		{#if !isStarting}
			<header class="mb-4">
				<h4 class="h4">Is the coffee machine powered up and good to go? ☕️</h4>
			</header>
			<footer class="mt-6 flex justify-end gap-3">
				<button
					type="button"
					class="flex w-2/5 items-center justify-center gap-2 rounded-lg bg-[#e5e0da] py-3 text-sm text-[#474441] transition"
					on:click={onConfirmNo}
				>
					⚡ Power On
				</button>
				<button
					type="button"
					class="flex w-2/5 items-center justify-center gap-2 rounded-lg bg-[#dcb98c] py-3 text-sm text-white transition"
					on:click={onConfirmYes}
				>
					👍 Ready, Brew!
				</button>
			</footer>
		{:else}
			<header class="mb-4 flex flex-col items-center gap-3">
				<h2 class="text-lg font-semibold">
					{#if !machineReady}Starting Machine…{:else}Machine Ready!{/if}
				</h2>
				<Progress value={progress} max={100} meterBg="bg-[#dcb98c]" />
			</header>

			{#if machineReady}
				<article class="mt-4">
					<p class="opacity-60">🎉 Your coffee machine is now online! Ready to brew?</p>
				</article>
				<footer class="mt-6 flex justify-end">
					<button
						type="button"
						class="flex w-2/5 items-center justify-center gap-2 rounded-lg bg-[#dcb98c] py-3 text-sm text-white transition"
						on:click={onConfirmYes}
					>
						Let’s Brew!
					</button>
				</footer>
			{:else}
				<article class="flex items-center space-x-2">
					<div
						class="h-4 w-4 animate-spin rounded-full border-2 border-amber-700 border-t-transparent"
					></div>
					<p class="opacity-60">Warming up the machine… hang tight, almost there!</p>
				</article>
			{/if}
		{/if}
	{/snippet}
</Modal>
