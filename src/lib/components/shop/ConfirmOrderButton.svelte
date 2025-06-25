<script lang="ts">
	import { orderCoffee } from '$lib/blockchain/contracts/makeCoffee';
	import { formatReceipt, type FormattedReceipt } from '$lib/blockchain/helper/formatReceipt';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { toastFactory } from '../toaster/Toaster';
	import { shopState } from '$lib/state/ShopState.svelte';
	import MetaMaskIcon from '$lib/components/wallet/MetaMaskIcon.svelte';

	function handleOpenChange(e: { open: boolean }) {
		shopState.confirmationModalOpen = e.open;
	}

	function onConfirmNo() {
		shopState.confirmationModalOpen = false;
		toastFactory.create({
			title: '⚠️ Machine Not Ready',
			description: 'Please ensure the machine is powered on and stocked with water & beans.',
			type: 'info',
			duration: 5000
		});
	}

	async function onConfirmYes() {
		shopState.confirmationModalOpen = false;

		const handleOrder = async () => {
			const receipt = await orderCoffee();
			const summary = await formatReceipt(receipt);

			return summary;
		};

		toastFactory.promise(handleOrder, {
			loading: {
				title: '☕ Brewing…',
				description: 'Submitting your order—this may take a few seconds.'
			},
			success: (summary: FormattedReceipt) => ({
				title: '✅ Coffee Ordered!',
				description: `Paid ${summary.amountUMETH} UMETH at ${new Date(
					summary.timestamp!
				).toLocaleTimeString()}. Enjoy!`
			}),
			error: () => ({
				title: '🚨 Order Failed',
				description: 'Something went wrong while processing your order. Please try again.'
			})
		});
	}
</script>

<Modal
	open={shopState.confirmationModalOpen}
	onOpenChange={handleOpenChange}
	contentBase="card bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto"
	triggerBase="flex w-full items-center justify-center gap-2 rounded-lg bg-[#DCC6AE] py-3 font-semibold text-white transition"
	backdropClasses="backdrop-blur-sm"
>
	{#snippet trigger()}
		<MetaMaskIcon width="20" />
		<span>Pay with MetaMask</span>
	{/snippet}

	{#snippet content()}
		<header class="mb-4">
			<h4 class="h4">Ready to Brew?</h4>
		</header>

		<article class="space-y-4 text-base opacity-60">
			<p>Is the coffee machine powered on, filled with water, and loaded with beans? ☕️</p>
		</article>

		<footer class="mt-6 flex justify-end gap-3">
			<button
				type="button"
				class="flex w-2/5 items-center justify-center gap-2 rounded-lg bg-[#DCC6AE] py-3 text-sm text-[#474441] transition hover:bg-[#B88C6A]"
				on:click={onConfirmNo}
			>
				❌ Not Ready
			</button>
			<button
				type="button"
				class="flex w-2/5 items-center justify-center gap-2 rounded-lg bg-[#DCC6AE] py-3 text-sm text-white transition hover:bg-[#B88C6A]"
				on:click={onConfirmYes}
			>
				✅ Yes, Brew!
			</button>
		</footer>
	{/snippet}
</Modal>
