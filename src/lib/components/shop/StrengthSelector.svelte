<script lang="ts">
	import { Segment } from '@skeletonlabs/skeleton-svelte';
	import { shopState, type CoffeeStrength } from '$lib/state/ShopState.svelte';
</script>

<p class="block text-sm font-medium text-gray-700">Strength</p>
<Segment
	name="strength"
	value={shopState.selectedCoffeeStrength}
	onValueChange={(e) => (shopState.selectedCoffeeStrength = e.value as CoffeeStrength)}
	classes="flex justify-center space-x-4 w-full"
	indicatorBg="bg-[#dcb98c]"
>
	<Segment.Item value="mild" classes="px-1 py-2 rounded-full text-sm font-medium">
		Mild
	</Segment.Item>
	<Segment.Item value="normal" classes="px-1 py-2 rounded-full text-sm font-medium">
		Normal
	</Segment.Item>
	<Segment.Item value="strong" classes="px-1 py-2 rounded-full text-sm font-medium">
		Strong
	</Segment.Item>
	<Segment.Item value="extra" classes="px-1 py-2 rounded-full text-sm font-medium">
		Extra
	</Segment.Item>
</Segment>
