import type { CoffeeType, CoffeeSize, CoffeeStrength } from '$lib/state/ShopState.svelte';

export const productTypeMap: Record<CoffeeType, Record<CoffeeSize, string>> = {
	coffee: {
		single: 'SingleCoffee',
		double: 'DoubleCoffee'
	},
	espresso: {
		single: 'SingleEspresso',
		double: 'DoubleEspresso'
	}
};

export const strengthMap: Record<CoffeeStrength, string> = {
	mild: 'Mild',
	normal: 'Normal',
	strong: 'Strong',
	extra: 'Extra'
};
