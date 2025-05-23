import { createWalletClient, custom, type WalletClient } from 'viem';
import { uniMaChain } from '../chains/uniMaChain';
import { getEthereumProvider } from '../provider/getEthereumProvider';

let _client: WalletClient | null = null;

export function getWalletClient(): WalletClient {
	if (_client) return _client;
	const provider = getEthereumProvider();
	_client = createWalletClient({
		chain: uniMaChain,
		transport: custom(provider)
	});
	return _client;
}
