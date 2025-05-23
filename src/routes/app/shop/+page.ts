import type { PageLoad } from './$types';
import { getProductPrices } from '$lib/blockchain/helper/getProductPrices';

export const load: PageLoad = async () => {
	const productPrices = await getProductPrices();

	return { productPrices };
};
