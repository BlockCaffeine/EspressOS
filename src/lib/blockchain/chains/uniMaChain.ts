import { defineChain } from 'viem';

export const cafereumAddress = '0xfA87eB3A4a16D9df4FFdC9167EC4E24BA3382c57';

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
