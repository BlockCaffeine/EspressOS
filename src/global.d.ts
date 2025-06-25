// src/global.d.ts
import type { EIP1193Provider } from 'viem';

declare global {
	interface Window {
		ethereum: EIP1193Provider & { chainId?: string };
	}
}
