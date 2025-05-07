import { toastFactory } from '$lib/components/toaster/Toaster';
import { resetWalletState, walletState } from '$lib/state/WalletState.svelte';
import { getEthereumProvider } from '../provider/getEthereumProvider';
import { fetchBalance } from './balance';
import { switchOrAddUniMaChain } from './connect';

export async function listenForChainChanges() {
	const provider = getEthereumProvider();
	if (!provider?.on) return;

	provider.on('chainChanged', async (chainIdHex: string) => {
		const chainId = parseInt(chainIdHex, 16);
		console.log('chainChanged to', chainId);

		if (chainId !== 585858) {
			resetWalletState();

			toastFactory.create({
				type: 'error',
				title: '❌ Network Changed',
				description: 'You switched networks. Please switch back to the (not) UniMa Chain.',
				action: {
					label: 'Switch',
					onClick: switchOrAddUniMaChain
				}
			});
		} else {
			walletState.connected = true;

			try {
				const accounts = await provider.request({ method: 'eth_accounts' });
				const account = accounts?.[0];

				if (account) {
					walletState.account = account as `0x${string}`;
					await fetchBalance(walletState.account);
				} else {
					resetWalletState();
				}
			} catch (err) {
				console.error('Failed to refetch accounts after chain change:', err);
				toastFactory.create({
					type: 'error',
					title: '🚨 Failed to load account',
					description: 'Please reconnect your wallet manually.'
				});
			}
		}
	});
}

export function listenForAccountChanges() {
	const provider = getEthereumProvider();

	if (!provider?.on) return;

	provider.on('accountsChanged', async (accounts: string[]) => {
		console.log('accountsChanged', accounts);
		const account = accounts[0];

		if (!account) {
			resetWalletState();
			return;
		}

		toastFactory.create({
			type: 'success',
			title: '🔄 Switched Account',
			description: `You switched your account to ${account}`,
			action: {
				label: 'Switch',
				onClick: switchOrAddUniMaChain
			}
		});

		walletState.account = account as `0x${string}`;
		walletState.connected = true;
		await fetchBalance(walletState.account);
	});
}
