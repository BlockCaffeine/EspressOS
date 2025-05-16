import { publicClient } from '../clients/publicClient';
import { getWalletClient } from '../clients/walletClient'; // your configured walletClient
import { abi } from './CafereumAbi.json'; // ABI for your Cafereum contract
import { uniMaChain } from '../chains/uniMaChain';
import { toastFactory } from '$lib/components/toaster/Toaster';
import {
	shopState,
	type CoffeeSize,
	type CoffeeStrength,
	type CoffeeType
} from '$lib/state/ShopState.svelte';
import type { TransactionReceipt } from 'viem';

const cafereumAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';

const productTypeMap: Record<CoffeeType, Record<CoffeeSize, string>> = {
	coffee: {
		single: 'SingleCoffee',
		double: 'DoubleCoffee'
	},
	espresso: {
		single: 'SingleEspresso',
		double: 'DoubleEspresso'
	}
};

const strengthMap: Record<CoffeeStrength, string> = {
	mild: 'Mild',
	normal: 'Normal',
	strong: 'Strong',
	extra: 'Extra'
};

export async function orderCoffee(): Promise<TransactionReceipt> {
	const walletClient = getWalletClient();

	try {
		const [account] = await walletClient.getAddresses();

		// 1) get price
		const price = await publicClient.readContract({
			address: cafereumAddress,
			abi,
			chain: uniMaChain,
			functionName: 'coffeePrice'
		});

		// 2) map to contract strings
		const { selectedCoffeeType, selectedCoffeeSize, selectedCoffeeStrength } = shopState;
		const productType = productTypeMap[selectedCoffeeType][selectedCoffeeSize];
		const productStrength = strengthMap[selectedCoffeeStrength];

		// 3) send tx
		const txHash = await walletClient.writeContract({
			address: cafereumAddress,
			abi,
			functionName: 'buyProduct',
			account,
			chain: uniMaChain,
			args: [productType, productStrength],
			value: price as bigint
		});

		// 4) wait & return
		return publicClient.waitForTransactionReceipt({ hash: txHash });
	} catch (err) {
		console.error('🚨 Failed to order coffee:', err);

		toastFactory.create({
			title: '☕ Payment Failed',
			description:
				"Your coffee order couldn't be completed. Check your wallet or try again in a few seconds.",
			type: 'error',
			duration: 7000
		});
	}
}
