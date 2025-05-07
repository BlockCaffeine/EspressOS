<script lang="ts">
	import { ChartArea, type Icon as IconType, House, Plus, Settings2, User } from '@lucide/svelte';

	interface NavItem {
		icon: typeof IconType;
		tooltip: string;
		sr: string;
		tooltipId: string;
		rounded?: string;
		isCenter?: boolean;
	}

	const navItems: NavItem[] = [
		{ icon: House, tooltip: 'Home', sr: 'Home', tooltipId: 'tooltip-home', rounded: 's' },
		{ icon: ChartArea, tooltip: 'Wallet', sr: 'Statistics', tooltipId: 'tooltip-wallet' },
		{
			icon: Plus,
			tooltip: 'Create new item',
			sr: 'New item',
			tooltipId: 'tooltip-new',
			isCenter: true
		},
		{ icon: Settings2, tooltip: 'Settings', sr: 'Settings', tooltipId: 'tooltip-settings' },
		{ icon: User, tooltip: 'Profile', sr: 'Profile', tooltipId: 'tooltip-profile', rounded: 'e' }
	];
</script>

{#snippet navButton(item: NavItem)}
	{#if item.isCenter}
		<div class="flex items-center justify-center">
			<button
				data-tooltip-target={item.tooltipId}
				type="button"
				class="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
			>
				<item.icon color="white" />
				<span class="sr-only">{item.sr}</span>
			</button>
		</div>
	{:else}
		<button
			data-tooltip-target={item.tooltipId}
			type="button"
			class={`group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 ${
				item.rounded === 's' ? 'rounded-s-full' : item.rounded === 'e' ? 'rounded-e-full' : ''
			}`}
		>
			<item.icon />
			<span class="sr-only">{item.sr}</span>
		</button>
	{/if}
{/snippet}

{#snippet navTooltip(item: NavItem)}
	<div
		id={item.tooltipId}
		role="tooltip"
		class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xs transition-opacity duration-300 dark:bg-gray-700"
	>
		{item.tooltip}
		<div class="tooltip-arrow" data-popper-arrow></div>
	</div>
{/snippet}

<!-- Actual navigation container -->
<div
	class="fixed bottom-4 left-1/2 z-50 h-16 w-11/12 max-w-lg -translate-x-1/2 rounded-full border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700"
>
	<div class="mx-auto grid h-full max-w-lg grid-cols-5">
		{#each navItems as item}
			{@render navButton(item)}
			{@render navTooltip(item)}
		{/each}
	</div>
</div>
