import { toastFactory } from '$lib/components/toaster/Toaster';
import { resetWalletState, walletState } from '$lib/state/WalletState.svelte';
import type { Address } from 'viem';
import { getEthereumProvider } from '../provider/getEthereumProvider';
import { fetchBalance } from './balance';

let _cleanupAccounts: (() => void) | null = null;
let _cleanupChains: (() => void) | null = null;

export async function listenForChainChanges() {
	const provider = getEthereumProvider();
	if (!provider?.on) return;

	// First, remove any old listener
	if (_cleanupChains) {
		_cleanupChains();
		_cleanupChains = null;
	}

	async function handleChainChanged(chainIdHex: string) {
		const chainId = parseInt(chainIdHex, 16);

		if (chainId !== 585858) {
			resetWalletState();

			toastFactory.create({
				type: 'error',
				title: '❌ Network Changed',
				description: 'You switched networks. Please switch back to the (not) UniMa Chain.'
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
	}

	// Attach the handler
	provider.on('chainChanged', handleChainChanged);

	// Save a cleanup function
	_cleanupChains = () => {
		provider.removeListener('chainChanged', handleChainChanged);
	};
}

export function listenForAccountChanges() {
	const provider = getEthereumProvider();
	if (!provider?.on) return;

	if (_cleanupAccounts) {
		_cleanupAccounts();
		_cleanupAccounts = null;
	}

	async function handleAccountsChanged(accounts: Address[]) {
		const account = accounts[0];

		if (!account) {
			resetWalletState();
			return;
		}

		walletState.account = account;
		walletState.connected = true;
		await fetchBalance(walletState.account);

		toastFactory.create({
			type: 'success',
			title: '🔄 Switched Account',
			description: `You switched your account to ${account}`
		});
	}

	provider.on('accountsChanged', handleAccountsChanged);

	_cleanupAccounts = () => {
		provider.removeListener('accountsChanged', handleAccountsChanged);
	};
}
