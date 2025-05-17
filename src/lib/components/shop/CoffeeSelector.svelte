<script lang="ts">
	import { determineNewPrice, shopState } from '$lib/state/ShopState.svelte';
</script>

<div class="flex flex-row gap-4">
	<select
		class="select rounded-container h-12"
		bind:value={shopState.selectedCoffeeType}
		onchange={determineNewPrice}
	>
		<option value="coffee">Coffee</option>
		<option value="espresso">Espresso</option>
	</select>

	<select
		class="select rounded-container h-12"
		bind:value={shopState.selectedCoffeeSize}
		onchange={determineNewPrice}
	>
		<option value="single">Single</option>
		<option value="double">Double</option>
	</select>
</div>
