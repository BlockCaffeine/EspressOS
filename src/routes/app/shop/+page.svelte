<script lang="ts">
	import coffeeOrderImage from '$lib/assets/coffeeOrderCardImage.avif';
	import ConfirmOrderButton from '$lib/components/shop/ConfirmOrderButton.svelte';
	import PriceBreakdown from '$lib/components/shop/PriceBreakdown.svelte';
	import StrengthSelector from '$lib/components/shop/StrengthSelector.svelte';
	import CoffeeSelector from '$lib/components/shop/CoffeeSelector.svelte';
</script>

<div
	class="card preset-filled-surface-100-900 border-surface-200-800 flex h-[calc(100vh-164px)] flex-col overflow-hidden rounded-xl border-[1px]"
>
	<header class="min-h-48 flex-1 basis-0">
		<img src={coffeeOrderImage} class="h-full w-full object-cover" alt="Coffee Banner" />
	</header>
	<article class="space-y-4 overflow-y-auto p-6">
		<!-- Title -->
		<h2 class="text-2xl font-semibold text-gray-900">Order Coffee</h2>
		<!-- Strength Selector -->
		<div class="flex flex-col space-y-3">
			<CoffeeSelector />
			<StrengthSelector />
		</div>

		<!-- Price Breakdown -->
		<PriceBreakdown />

		<hr class="hr border-t-2" />

		<!-- Pay Button -->
		<ConfirmOrderButton />
	</article>
</div>
