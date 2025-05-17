<script lang="ts">
	import { shopState } from '$lib/state/ShopState.svelte';

	const gasFee = 0.000077;
	const total = $derived((shopState.selectedCoffeePrice + gasFee).toFixed(6));
</script>

<div class="space-y-2 border-t border-gray-200 pt-4 text-sm">
	<div class="flex justify-between">
		<span class="text-gray-700">Coffee</span>
		<span class="text-gray-900">{shopState.selectedCoffeePrice.toFixed(6)} UMETH</span>
	</div>
	<div class="flex justify-between">
		<span class="text-gray-700">Gas Fee</span>
		<span class="text-gray-900">{gasFee.toFixed(6)} UMETH</span>
	</div>
	<hr class="border-gray-200" />
	<div class="flex justify-between font-medium">
		<span class="text-gray-800">Total</span>
		<span class="text-gray-800">{total} UMETH</span>
	</div>
</div>
