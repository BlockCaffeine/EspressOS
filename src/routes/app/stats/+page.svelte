<script lang="ts">
	import { reloadStatistics, statistics } from '$lib/state/StatsState.svelte';
	import { formatEther } from 'viem/utils';
	import { walletState } from '$lib/state/WalletState.svelte';

	let avgOthers: number = $state(0);
	let maxCount = $state(1);

	$effect(() => {
		const acct = walletState.account;
		if (acct) reloadStatistics();
	});

	// Recompute avgOthers and chart max on each data update
	$effect(() => {
		const stat = statistics;
		if (!stat.purchases || !stat.chartData) return;

		const { coffee, espresso } = stat.purchases;

		// sum all counts
		let total = 0n;
		for (const c of coffee.counts) total += c;
		for (const c of espresso.counts) total += c;

		// your count is always the first item
		const you = stat.chartData[0]?.count ?? 0n;
		const othersNum = coffee.buyers.length + espresso.buyers.length - 1 || 1;

		avgOthers = Number((total - you) / BigInt(othersNum));
		maxCount = Math.max(...stat.chartData.map((r) => Number(r.count)), 1);
	});
</script>

<svelte:head>
	<title>BlockCaffeine - Your Dashboard</title>
</svelte:head>

<div class="mx-auto max-w-4xl p-6">
	<h1 class="mb-8 text-center text-3xl font-bold">Your Dashboard</h1>

	{#if statistics.loading}
		<p class="text-center text-gray-500">Loading…</p>
	{:else if statistics.error}
		<p class="text-center text-red-600">Error: {statistics.error.message}</p>
	{:else if statistics.raw && statistics.purchases}
		<!-- KPI cards -->
		<div class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-2 text-sm font-medium text-gray-600">Total Coffee Consumed</h2>
				<p class="text-2xl font-bold text-gray-900">{statistics.raw.totalPurchases.toString()}</p>
			</div>

			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-2 text-sm font-medium text-gray-600">Avg. Consumption (Peers)</h2>
				<p class="text-2xl font-bold text-gray-900">{avgOthers}</p>
			</div>

			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-2 text-sm font-medium text-gray-600">Net Spend</h2>
				<p class="text-2xl font-bold text-gray-900">
					{formatEther(statistics.raw.moneySpent)} UMETH
				</p>
			</div>

			<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 class="mb-2 text-sm font-medium text-gray-600">Favorite Drink</h2>
				<p class="text-2xl font-bold text-gray-900">
					{statistics.raw.favCategory === 0n ? 'Coffee' : 'Espresso'}
				</p>
			</div>
		</div>

		<!-- Bar chart -->
		<section class="mb-12">
			<h2 class="mb-4 text-2xl font-semibold text-gray-700">Comparison with Colleagues</h2>
			<div class="flex h-64 items-end space-x-4 border-b border-gray-200 pb-2">
				{#each statistics.chartData! as row}
					<div class="flex flex-1 flex-col-reverse items-center">
						<div
							class="w-full rounded-t-lg transition-all"
							class:bg-amber-300={row.highlight}
							class:bg-gray-300={!row.highlight}
							style="height: {(Number(row.count) / maxCount) * 100}%"
						></div>
						<span class="mt-2 text-sm text-gray-700">{row.label}</span>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
