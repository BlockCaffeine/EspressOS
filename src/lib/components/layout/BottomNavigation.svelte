<script lang="ts">
	import { page } from '$app/state';
	import { ChartArea, type Icon as IconType, Coffee } from '@lucide/svelte';

	interface NavItem {
		icon: typeof IconType;
		iconLabel: string;
		tooltip: string;
		sr: string;
		tooltipId: string;
		navPage: string;
		rounded?: string;
		isCenter?: boolean;
	}

	const navItems: NavItem[] = [
		{
			icon: Coffee,
			iconLabel: 'Order',
			tooltip: 'Order Coffee',
			sr: 'New item',
			navPage: '/app/shop',
			tooltipId: 'tooltip-new',
			isCenter: true
		},
		{
			icon: ChartArea,
			iconLabel: 'Stats',
			tooltip: 'See Statistics',
			sr: 'Statistics',
			navPage: '/app/stats',
			tooltipId: 'tooltip-wallet'
		}
	];
</script>

<!-- Navigation container -->
<div
	class="fixed right-0 bottom-0 left-0 z-50 h-16 w-full overflow-hidden rounded-t-xl border-t border-gray-200 bg-white"
>
	<div class="grid h-full grid-cols-2">
		{#each navItems as item}
			<a
				href={item.navPage}
				class={`flex w-full flex-col items-center justify-center transition-colors duration-200 ${
					item.navPage === page.url.pathname
						? 'bg-[#DCC6AE] font-semibold text-[#3b2d1f]'
						: 'bg-white text-gray-500 hover:text-[#6f512a]'
				}`}
			>
				<item.icon class="mb-1 h-5 w-5" />
				<span class="text-xs">{item.iconLabel}</span>
			</a>
		{/each}
	</div>
</div>
