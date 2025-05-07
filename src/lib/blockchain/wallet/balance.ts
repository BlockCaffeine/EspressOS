import { getBalance } from 'viem/actions';
import { publicClient } from '../clients/publicClient';
import { walletState } from '$lib/state/WalletState.svelte';
import { toastFactory } from '$lib/components/toaster/Toaster';

export async function fetchBalance(account: `0x${string}`) {
	try {
		const balance = await getBalance(publicClient, { address: account });
		walletState.balance = balance;
	} catch (err) {
		console.error('Failed to fetch balance:', err);
		toastFactory.create({
			type: 'error',
			title: '⚠️ Failed to Fetch Balance',
			description: 'Could not fetch wallet balance. Try again later.'
		});
	}
}
