import type { Address } from 'viem';
import { cafereumAddress } from '../chains/uniMaChain';
import { publicClient } from '../clients/publicClient';
import { abi } from '../contracts/CafereumAbi.json';

export interface AllPurchases {
	buyers: Address[];
	counts: bigint[];
}

export async function fetchAllPurchases(): Promise<{
	coffee: AllPurchases;
	espresso: AllPurchases;
}> {
	const [coffeeRes, espressoRes] = await Promise.all([
		publicClient.readContract({
			address: cafereumAddress,
			abi,
			functionName: 'getAllCoffeePurchases'
		}) as Promise<[Address[], bigint[]]>,
		publicClient.readContract({
			address: cafereumAddress,
			abi,
			functionName: 'getAllEspressoPurchases'
		}) as Promise<[Address[], bigint[]]>
	]);

	return {
		coffee: { buyers: coffeeRes[0], counts: coffeeRes[1] },
		espresso: { buyers: espressoRes[0], counts: espressoRes[1] }
	};
}
