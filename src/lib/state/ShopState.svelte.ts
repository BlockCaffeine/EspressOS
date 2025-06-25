import type { ProductPrice } from '$lib/blockchain/helper/getProductPrices';
import { productTypeMap } from '$lib/blockchain/helper/mappings';
import { parseEther } from 'viem';

export type CoffeeType = 'coffee' | 'espresso';
export type CoffeeSize = 'single' | 'double';
export type CoffeeStrength = 'mild' | 'normal' | 'strong' | 'extra';

export interface ShopState {
	selectedCoffeeType: CoffeeType;
	selectedCoffeeSize: CoffeeSize;
	selectedCoffeeStrength: CoffeeStrength;
	confirmationModalOpen: boolean;
	productPrices: ProductPrice[];
	selectedCoffeePrice: bigint;
}
export const shopState: ShopState = $state({
	selectedCoffeeType: 'coffee',
	selectedCoffeeSize: 'single',
	selectedCoffeeStrength: 'normal',
	confirmationModalOpen: false,
	productPrices: [],
	selectedCoffeePrice: -1n
});

export function resetShopState() {
	// Technically we could reset everything, but the
	// other stuff is not that important. The user can
	// just reselect the order.
	shopState.confirmationModalOpen = false;
}

export function determineNewPrice() {
	const name = productTypeMap[shopState.selectedCoffeeType][shopState.selectedCoffeeSize];
	const entry = shopState.productPrices.find((p) => p.name === name);
	const raw = entry?.priceUMETH ?? '0'; // e.g. "0.01", "0.02"
	// parseEther will throw if you give it something non‐numeric, so it's
	// still safe against malformed strings
	shopState.selectedCoffeePrice = parseEther(raw);
}
