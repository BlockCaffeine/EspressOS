<!-- src/routes/stats/+page.svelte -->
<script lang="ts">
	import { reloadStatistics, statistics } from '$lib/state/StatsState.svelte';
	import { formatEther } from 'viem/utils';
	import { walletState } from '$lib/state/WalletState.svelte';
	import PurchaseChart from '$lib/components/stats/PurchaseChart.svelte';

	// Kick off a reload whenever the account appears or changes
	$effect(() => {
		const acct = walletState.account;
		if (acct) reloadStatistics(acct);
	});

	/** the average consumption of *other* users */
	let avgPeers = $state(0);

	$effect(() => {
		const stat = statistics;
		const user = walletState.account;
		if (!stat.purchases || !user) {
			avgPeers = 0;
			return;
		}

		// build a map from address → total (coffee + espresso)
		const totals = new Map<string, bigint>();

		// sum coffee counts
		for (let i = 0; i < stat.purchases.coffee.buyers.length; i++) {
			const addr = stat.purchases.coffee.buyers[i];
			totals.set(addr, stat.purchases.coffee.counts[i]);
		}
		// add espresso counts
		for (let i = 0; i < stat.purchases.espresso.buyers.length; i++) {
			const addr = stat.purchases.espresso.buyers[i];
			const prev = totals.get(addr) ?? 0n;
			totals.set(addr, prev + stat.purchases.espresso.counts[i]);
		}

		// remove the current user
		totals.delete(user);

		const peerCount = totals.size;
		if (peerCount === 0) {
			avgPeers = 0;
			return;
		}

		// sum all the peers’ totals
		let sum = 0n;
		for (const val of totals.values()) {
			sum += val;
		}

		// integer‐divide and convert to number
		avgPeers = Number(sum / BigInt(peerCount));
	});
</script>

<svelte:head>
	<title>BlockCaffeine - Your Dashboard</title>
</svelte:head>

<div class="mx-auto max-w-screen-md p-4">
	<h1 class="mb-6 text-center text-3xl font-bold">Your Dashboard</h1>

	{#if statistics.loading}
		<p class="text-center text-gray-500">Loading…</p>
	{:else if statistics.error}
		<p class="text-center break-all text-red-600">Error: {statistics.error.message}</p>
	{:else if statistics.raw && statistics.purchases}
		<div class="mb-8 grid grid-cols-2 gap-4">
			<div class="flex flex-col rounded-lg bg-white p-4 shadow">
				<span class="text-sm font-medium text-gray-500">Total Coffee Consumed</span>
				<span class="mt-2 text-xl font-semibold text-gray-800">{statistics.raw.totalPurchases}</span
				>
			</div>

			<div class="flex flex-col rounded-lg bg-white p-4 shadow">
				<span class="text-sm font-medium text-gray-500">Avg. Consumption (Peers)</span>
				<span class="mt-2 text-xl font-semibold text-gray-800">{avgPeers}</span>
			</div>

			<div class="flex flex-col rounded-lg bg-white p-4 shadow">
				<span class="text-sm font-medium text-gray-500">Net Spend</span>
				<span class="mt-2 text-xl font-semibold text-gray-800"
					>{formatEther(statistics.raw.moneySpent)} UMETH</span
				>
			</div>

			<div class="flex flex-col rounded-lg bg-white p-4 shadow">
				<span class="text-sm font-medium text-gray-500">Favorite Drink</span>
				<div class="mt-2 flex items-center justify-center space-x-2">
					<!-- Category name -->
					<span class="text-xl font-semibold text-gray-800">
						{statistics.raw.favCategory}
					</span>

					<!-- Badge showing the count -->
					<span
						class="inline-block rounded-full bg-gray-200 px-2 py-0.5
             text-xs font-medium text-gray-800"
					>
						{statistics.raw.favCount.toString()}×
					</span>
				</div>
			</div>
		</div>

		<!-- Chart -->
		<section class="mb-6 p-4">
			<h2 class="mb-4 text-2xl font-semibold text-gray-700">Comparison with Colleagues</h2>
			<div class="rounded-lg bg-white p-4 shadow">
				<PurchaseChart data={statistics.chartData!} />
			</div>
		</section>
	{/if}
</div>
