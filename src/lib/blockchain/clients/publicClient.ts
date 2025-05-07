import { createPublicClient, http } from 'viem';
import { uniMaChain } from '../chains/uniMaChain';

export const publicClient = createPublicClient({
	chain: uniMaChain,
	transport: http()
});
