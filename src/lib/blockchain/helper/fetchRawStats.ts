import { publicClient } from '../clients/publicClient';
import { cafereumAddress } from '../chains/uniMaChain';
import { abi } from '../contracts/CafereumAbi.json';
import type { Address } from 'viem';

export interface RawStats {
	totalPurchases: bigint;
	moneySpent: bigint;
	[key: string]: bigint; // for extensibility
}

export async function fetchRawStats(user: Address): Promise<RawStats> {
	// fire the three view calls in parallel
	const [totalPurchases, moneySpent, favTuple] = (await Promise.all([
		publicClient.readContract({
			address: cafereumAddress,
			abi,
			functionName: 'getTotalPurchasesCount',
			args: [user]
		}),
		publicClient.readContract({
			address: cafereumAddress,
			abi,
			functionName: 'getMoneySpent',
			args: [user]
		}),
		publicClient.readContract({
			address: cafereumAddress,
			abi,
			functionName: 'getMostFrequentlyOrderedCategory',
			args: [user]
		})
	])) as [bigint, bigint, [bigint, bigint]];
	const [favCategory, favCount] = favTuple;

	return { totalPurchases, moneySpent, favCategory, favCount };
}

// can be used if I find the time to implement multicall on our blockchain
export async function fetchRawStatsWithMulticall(user: Address): Promise<RawStats> {
	const calls = [
		{ functionName: 'getTotalPurchasesCount', args: [], abi },
		{ functionName: 'getMoneySpent', args: [user], abi },
		{ functionName: 'getMostFrequentlyOrderedCategory', args: [], abi }
	] as const;

	const batch = await publicClient.multicall({
		contracts: calls.map((c) => ({
			address: cafereumAddress,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			abi: c.abi as any,
			functionName: c.functionName,
			args: c.args
		}))
	});

	const results = batch.map((r) => {
		if (r.status === 'success') return r.result;
		else throw r.error;
	});

	// now `results` is unknown[] that you can destructure
	const [totalPurchases, moneySpent, favTuple] = results as [bigint, bigint, [bigint, bigint]];
	const [favCategory, favCount] = favTuple;

	return {
		totalPurchases,
		moneySpent,
		favCategory, // e.g. 0=coffee,1=espresso
		favCount
	};
}
