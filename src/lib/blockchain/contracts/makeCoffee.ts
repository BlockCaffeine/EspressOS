import { publicClient } from '../clients/publicClient';
import { getWalletClient } from '../clients/walletClient';
import { abi } from './CafereumAbi.json';
import { cafereumAddress, uniMaChain } from '../chains/uniMaChain';
import { shopState } from '$lib/state/ShopState.svelte';
import type { TransactionReceipt } from 'viem';
import { productTypeMap, strengthMap } from '../helper/mappings';

export async function orderCoffee(): Promise<TransactionReceipt> {
	const walletClient = getWalletClient();

	try {
		const [account] = await walletClient.getAddresses();

		// 1) map to contract strings
		const { selectedCoffeeType, selectedCoffeeSize, selectedCoffeeStrength } = shopState;
		const productType = productTypeMap[selectedCoffeeType][selectedCoffeeSize];
		const productStrength = strengthMap[selectedCoffeeStrength];

		// 2) send tx
		const txHash = await walletClient.writeContract({
			address: cafereumAddress,
			abi,
			functionName: 'buyProduct',
			account,
			chain: uniMaChain,
			args: [productType, productStrength],
			value: shopState.selectedCoffeePrice as bigint
		});

		// 4) wait & return
		return publicClient.waitForTransactionReceipt({ hash: txHash });
	} catch (err) {
		console.error('🚨 Error in orderCoffee:', err);

		// Rethrow the error for our consumers
		throw err;
	}
}
