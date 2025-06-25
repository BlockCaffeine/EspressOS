<script lang="ts">
	import singleCoffeeImg from '$lib/assets/single-coffee.png';
	import doubleCoffeeImg from '$lib/assets/double-coffee.png';
	import singleEspressoImg from '$lib/assets/single-espresso.png';
	import doubleEspressoImg from '$lib/assets/double-espresso.png';
	import ConfirmOrderButton from '$lib/components/shop/ConfirmOrderButton.svelte';
	import PriceBreakdown from '$lib/components/shop/PriceBreakdown.svelte';
	import StrengthSelector from '$lib/components/shop/StrengthSelector.svelte';
	import CoffeeSelector from '$lib/components/shop/CoffeeSelector.svelte';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import { determineNewPrice, shopState } from '$lib/state/ShopState.svelte';

	let { data }: PageProps = $props();

	onMount(() => {
		shopState.productPrices = data.productPrices;
		determineNewPrice();
	});

	// reactive “computed” image URL
	let coffeeOrderImage: string = $state(singleCoffeeImg);
	$effect(() => {
		const { selectedCoffeeType: type, selectedCoffeeSize: size } = shopState;
		if (type === 'coffee' && size === 'single') coffeeOrderImage = singleCoffeeImg;
		else if (type === 'coffee' && size === 'double') coffeeOrderImage = doubleCoffeeImg;
		else if (type === 'espresso' && size === 'single') coffeeOrderImage = singleEspressoImg;
		else /* espresso & double */ coffeeOrderImage = doubleEspressoImg;
	});
</script>

<svelte:head>
	<title>BlockCaffeine - Buy A Coffee</title>
</svelte:head>

<div
	class="card preset-filled-surface-100-900 border-surface-200-800 flex h-[calc(100vh-164px)] flex-col overflow-hidden rounded-xl border-[1px]"
>
	<header class="min-h-48 flex-1 basis-0">
		<img src={coffeeOrderImage} class="h-full w-full object-cover" alt="Coffee Banner" />
	</header>
	<article class="space-y-4 overflow-y-auto p-6">
		<!-- Title -->
		<h2 class="text-2xl font-semibold text-[#6F4E37]">Order Coffee</h2>
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
