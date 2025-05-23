<script lang="ts">
	import { page } from '$app/state';
	import { ChartArea, type Icon as IconType, House, Coffee } from '@lucide/svelte';

	interface NavItem {
		icon: typeof IconType;
		tooltip: string;
		sr: string;
		tooltipId: string;
		navPage: string;
		rounded?: string;
		isCenter?: boolean;
	}

	const navItems: NavItem[] = [
		{
			icon: House,
			tooltip: 'Home',
			sr: 'Home',
			navPage: '/app',
			tooltipId: 'tooltip-home',
			rounded: 's'
		},
		{
			icon: Coffee,
			tooltip: 'Create new item',
			sr: 'New item',
			navPage: '/app/shop',
			tooltipId: 'tooltip-new',
			isCenter: true
		},
		{
			icon: ChartArea,
			tooltip: 'Wallet',
			sr: 'Statistics',
			navPage: '/app/stats',
			tooltipId: 'tooltip-wallet'
		}
	];
</script>

{#snippet navButton(item: NavItem)}
	{#if item.navPage === page.url.pathname}
		<div class="flex items-center justify-center">
			<a
				data-tooltip-target={item.tooltipId}
				type="button"
				class="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8c496] font-medium hover:bg-[#6f512a] focus:ring-4 focus:ring-[#f8b55e] focus:outline-none"
				href={item.navPage}
			>
				<item.icon color="white" />
				<span class="sr-only">{item.sr}</span>
			</a>
		</div>
	{:else}
		<a
			data-tooltip-target={item.tooltipId}
			type="button"
			class={`group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 ${
				item.rounded === 's' ? 'rounded-s-full' : item.rounded === 'e' ? 'rounded-e-full' : ''
			}`}
			href={item.navPage}
		>
			<item.icon />
			<span class="sr-only">{item.sr}</span>
		</a>
	{/if}
{/snippet}

{#snippet navTooltip(item: NavItem)}
	<div
		id={item.tooltipId}
		role="tooltip"
		class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xs transition-opacity duration-300"
	>
		{item.tooltip}
		<div class="tooltip-arrow" data-popper-arrow></div>
	</div>
{/snippet}

<!-- Actual navigation container -->
<div class="h-16 w-full rounded-t-xl border-t border-gray-200 bg-white">
	<div class="mx-auto grid h-full max-w-lg grid-cols-3">
		{#each navItems as item}
			{@render navButton(item)}
			{@render navTooltip(item)}
		{/each}
	</div>
</div>
