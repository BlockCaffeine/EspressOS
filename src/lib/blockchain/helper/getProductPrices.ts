import { publicClient } from '../clients/publicClient';
import { cafereumAddress } from '../chains/uniMaChain';
import { abi } from '../contracts/CafereumAbi.json';
import { formatEther } from 'viem';

export interface ProductPrice {
	name: string;
	priceUMETH: string;
}

export async function getProductPrices(): Promise<ProductPrice[]> {
	// readContract here is the client method (same signature issues apply),
	// so we cast the unknown to the tuple we know it is:
	const result = (await publicClient.readContract({
		address: cafereumAddress,
		abi,
		functionName: 'getProductNamesAndPrices'
	})) as [string[], bigint[]];

	const [names, rawPrices] = result;

	return names.map((name, i) => ({
		name,
		priceUMETH: formatEther((rawPrices as bigint[])[i])
	}));
}
