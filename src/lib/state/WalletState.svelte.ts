export type WalletAccount = `0x${string}` | '';

export interface WalletState {
	balance: bigint | null;
	isConnecting: boolean;
	connected: boolean;
	account: WalletAccount;
}
export const walletState: WalletState = $state({
	isConnecting: false,
	connected: false,
	account: '',
	balance: null
});

export function resetWalletState() {
	walletState.isConnecting = false;
	walletState.connected = false;
	walletState.account = '';
	walletState.balance = null;
}
