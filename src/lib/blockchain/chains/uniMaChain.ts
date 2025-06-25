import { defineChain, type Address } from 'viem';
import { env } from '$env/dynamic/public';

export const cafereumAddress: Address = env.PUBLIC_CAFEREUM_ADDRESS as Address;

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
			http: ['https://fortuna.informatik.uni-mannheim.de:32779']
		}
	},
	blockExplorers: {
		default: {
			name: 'No Explorer',
			url: ''
		}
	}
});
