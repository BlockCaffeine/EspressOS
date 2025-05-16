export type CoffeeType = 'coffee' | 'espresso';
export type CoffeeSize = 'single' | 'double';
export type CoffeeStrength = 'mild' | 'normal' | 'strong' | 'extra';

export interface ShopState {
	selectedCoffeeType: CoffeeType;
	selectedCoffeeSize: CoffeeSize;
	selectedCoffeeStrength: CoffeeStrength;
	confirmationModalOpen: boolean;
}
export const shopState: ShopState = $state({
	selectedCoffeeType: 'coffee',
	selectedCoffeeSize: 'single',
	selectedCoffeeStrength: 'normal',
	confirmationModalOpen: false
});

export function resetWalletState() {
	// Technically we could reset everything, but the
	// other stuff is not that important. The user can
	// just reselect the order.
	shopState.confirmationModalOpen = false;
}
