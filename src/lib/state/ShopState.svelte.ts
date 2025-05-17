import type { ProductPrice } from '$lib/blockchain/helper/getProductPrices';
import { productTypeMap } from '$lib/blockchain/helper/mappings';

export type CoffeeType = 'coffee' | 'espresso';
export type CoffeeSize = 'single' | 'double';
export type CoffeeStrength = 'mild' | 'normal' | 'strong' | 'extra';

export interface ShopState {
	selectedCoffeeType: CoffeeType;
	selectedCoffeeSize: CoffeeSize;
	selectedCoffeeStrength: CoffeeStrength;
	confirmationModalOpen: boolean;
	productPrices: ProductPrice[];
	selectedCoffeePrice: number;
}
export const shopState: ShopState = $state({
	selectedCoffeeType: 'coffee',
	selectedCoffeeSize: 'single',
	selectedCoffeeStrength: 'normal',
	confirmationModalOpen: false,
	productPrices: [],
	selectedCoffeePrice: -1
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
	const newPrice = parseFloat(entry?.priceUMETH ?? '0');

	console.log('New price should be: ', newPrice);

	shopState.selectedCoffeePrice = newPrice;
}
