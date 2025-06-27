import type { Address } from 'viem';
import { fetchRawStats, type RawStats } from '$lib/blockchain/helper/fetchRawStats';
import { fetchAllPurchases, type AllPurchases } from '$lib/blockchain/helper/fetchAllPurchases';

export interface PurchaseGroup {
	coffee: AllPurchases;
	espresso: AllPurchases;
}

// Shape for stacked bar chart data (ApexCharts)
export interface StackedChartData {
	labels: string[];
	series: { name: string; data: number[] }[];
	colors: string[];
}

// Global statistics state
export interface StatisticsState {
	raw?: RawStats;
	purchases?: PurchaseGroup;
	chartData?: StackedChartData;
	loading: boolean;
	error?: Error;
}

// Create a reactive state store
export const statistics = $state<StatisticsState>({ loading: false });

/**
 * Build a stacked chart data set, capped
 * at `maxOthers` users beside “You.”
 */
export function computeStackedChartData(
	all: PurchaseGroup,
	user: Address,
	maxOthers = 5
): StackedChartData {
	// 1) build maps for coffee & espresso separately
	const coffeeMap = new Map<string, bigint>();
	const espressoMap = new Map<string, bigint>();

	for (let i = 0; i < all.coffee.buyers.length; i++) {
		coffeeMap.set(all.coffee.buyers[i], all.coffee.counts[i]);
	}
	for (let i = 0; i < all.espresso.buyers.length; i++) {
		const addr = all.espresso.buyers[i];
		espressoMap.set(addr, all.espresso.counts[i]);
	}

	// 2) pull out “You”
	const youCoffee = coffeeMap.get(user) ?? 0n;
	const youEspresso = espressoMap.get(user) ?? 0n;
	coffeeMap.delete(user);
	espressoMap.delete(user);

	// 3) sort the rest by total consumption (coffee+espresso)
	const others = Array.from(coffeeMap.entries())
		.map(([addr, coff]) => {
			const esp = espressoMap.get(addr) ?? 0n;
			return { addr, total: coff + esp, coff, esp };
		})
		.sort((a, b) => Number(b.total - a.total)) // descending
		.slice(0, maxOthers);

	// 4) build the arrays for ApexCharts
	const labels = ['You', ...others.map((o, i) => `User ${i + 1}`)];
	const coffeeData = [Number(youCoffee), ...others.map((o) => Number(o.coff))];
	const espressoData = [Number(youEspresso), ...others.map((o) => Number(o.esp))];
	const colors = [
		'#DCC6AE', // you = amber
		...others.map(() => '#CCCCCC')
	];

	return {
		labels,
		series: [
			{ name: 'Coffee', data: coffeeData },
			{ name: 'Espresso', data: espressoData }
		],
		colors
	};
}

// Reload function to fetch on-chain data and update state
export async function reloadStatistics(user: Address) {
	statistics.loading = true;
	statistics.error = undefined;

	try {
		const [raw, purchases] = await Promise.all([fetchRawStats(user), fetchAllPurchases()]);

		statistics.raw = raw;
		statistics.purchases = purchases;
		statistics.chartData = computeStackedChartData(purchases, user, 8);
	} catch (err) {
		statistics.error = err as Error;
	} finally {
		statistics.loading = false;
	}
}
