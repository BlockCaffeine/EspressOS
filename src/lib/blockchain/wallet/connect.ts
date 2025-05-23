import { getEthereumProvider } from '../provider/getEthereumProvider';
import { fetchBalance } from './balance';
import { listenForChainChanges, listenForAccountChanges } from './listeners';
import { walletState } from '$lib/state/WalletState.svelte';
import { toastFactory } from '$lib/components/toaster/Toaster';
import { getWalletClient } from '../clients/walletClient';
import { uniMaChain } from '../chains/uniMaChain';
import { getChainId } from 'viem/actions';

async function ensureCorrectNetwork(): Promise<boolean> {
	const currentChainId = await getChainId(getWalletClient());
	return currentChainId === uniMaChain.id;
}

export async function connectMetamaskWallet() {
	try {
		walletState.isConnecting = true;

		let isCorrectNetwork = await ensureCorrectNetwork();

		if (!isCorrectNetwork) {
			// Try once to switch automatically.
			await switchOrAddUniMaChain();
			// re-read chainId after switch
			isCorrectNetwork = await ensureCorrectNetwork();
			if (!isCorrectNetwork) {
				toastFactory.create({
					type: 'error',
					title: '❌ Wrong Network',
					description: `Please switch to (not) UniMa Chain (ID ${uniMaChain.id}) and try again.`
				});
				return;
			}
		}

		const accounts = await getWalletClient().requestAddresses();
		const account = accounts[0];

		walletState.account = account;
		walletState.connected = true;

		listenForChainChanges();
		listenForAccountChanges();
		await fetchBalance(account);
	} catch (error) {
		console.error(error);

		toastFactory.create({
			type: 'error',
			title: '⚠️ Connection Failed',
			description: 'Something went wrong while connecting. Please try again.'
		});
	} finally {
		walletState.isConnecting = false;
	}
}

export async function switchOrAddUniMaChain() {
	const provider = getEthereumProvider(); // Safely get the provider
	if (!provider) return;

	try {
		await provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: `0x${uniMaChain.id.toString(16)}` }] // hex of 585858
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (switchError: any) {
		if (switchError.code === 4902) {
			// Chain not found, let's add it
			await provider.request({
				method: 'wallet_addEthereumChain',
				params: [
					{
						chainId: `0x${uniMaChain.id.toString(16)}`,
						chainName: '(not) UniMa Chain',
						nativeCurrency: {
							name: 'UMETH',
							symbol: 'UMETH',
							decimals: 18
						},
						rpcUrls: ['https://fortuna.informatik.uni-mannheim.de:32779'],
						blockExplorerUrls: []
					}
				]
			});
		} else {
			console.error('❌ Failed to switch network:', switchError);
			throw switchError;
		}
	}
}
