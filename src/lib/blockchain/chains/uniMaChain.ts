import { defineChain } from 'viem';

export const uniMaChain = defineChain({
	id: 585858,
	name: '(not) UniMa Chain',
	network: 'not-unima',
	nativeCurrency: {
		name: 'ETH',
		symbol: 'ETH',
		decimals: 18
	},
	rpcUrls: {
		default: {
			http: ['http://134.155.52.185:32779']
		}
	},
	blockExplorers: {
		default: {
			name: 'No Explorer',
			url: ''
		}
	}
});
