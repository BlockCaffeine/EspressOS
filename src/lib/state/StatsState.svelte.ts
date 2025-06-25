import type { Address } from 'viem';
import { fetchRawStats, type RawStats } from '$lib/blockchain/helper/fetchRawStats';
import { walletState } from './WalletState.svelte';
import { fetchAllPurchases, type AllPurchases } from '$lib/blockchain/helper/fetchAllPurchases';

export interface PurchaseGroup {
	coffee: AllPurchases;
	espresso: AllPurchases;
}

export interface ChartDataItem {
	label: string;
	count: bigint;
	highlight?: boolean;
}

export interface StatisticsState {
	raw?: RawStats;
	purchases?: PurchaseGroup;
	chartData?: ChartDataItem[];
	loading: boolean;
	error?: Error;
}

export const statistics: StatisticsState = $state({ loading: false });

function computeChartData(
	all: PurchaseGroup,
	user: Address
): { label: string; count: bigint; highlight?: boolean }[] {
	const map = new Map<string, bigint>();

	// sum coffee
	for (let i = 0; i < all.coffee.buyers.length; i++) {
		map.set(all.coffee.buyers[i], all.coffee.counts[i]);
	}
	// sum espresso
	for (let i = 0; i < all.espresso.buyers.length; i++) {
		const addr = all.espresso.buyers[i];
		map.set(addr, (map.get(addr) || 0n) + all.espresso.counts[i]);
	}

	// pull out & highlight the current user
	const youCount = map.get(user) ?? 0n;
	map.delete(user);

	// sort the rest descending, pseudonymize
	const others = Array.from(map.entries())
		.sort(([, a], [, b]) => Number(b - a))
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.map(([_, count], idx) => ({
			label: `User ${idx + 1}`,
			count
		}));

	return [{ label: 'You', count: youCount, highlight: true }, ...others];
}

export async function reloadStatistics() {
	// kick off loading
	statistics.loading = true;

	try {
		// This is hacky and should never be used in real business code.
		const userAddress = walletState.account || '0x';
		const [raw, purchases] = await Promise.all([
			fetchRawStats(userAddress), // -> RawStats
			fetchAllPurchases() // -> PurchaseGroup
		]);

		const chartData = computeChartData(purchases, userAddress);

		statistics.raw = raw;
		statistics.purchases = purchases;
		statistics.chartData = chartData;
		statistics.loading = false;
	} catch (error) {
		statistics.loading = false;
		statistics.error = error as Error;
	}
}
