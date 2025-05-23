import { toastFactory } from '$lib/components/toaster/Toaster';
import 'viem/window'; // ensures window.ethereum is typed

export function getEthereumProvider() {
	if (typeof window === 'undefined' || !window.ethereum) {
		toastFactory.create({
			type: 'error',
			title: '☕ No Wallet, No Coffee',
			description:
				'You need MetaMask to get through this paywall. No wallet, no beans. Install it and try again.'
		});
		throw new Error('MetaMask provider not found');
	}

	return window.ethereum;
}
