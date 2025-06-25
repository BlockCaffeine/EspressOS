import { defineChain, type Address } from 'viem';

export const cafereumAddress: Address = '0xC495f6FF1912FB7cC33C65c3f8542aE78044D3C0';

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
