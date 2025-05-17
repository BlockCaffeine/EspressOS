export type WalletAccount = `0x${string}` | '';

export interface WalletState {
	balance: bigint;
	isConnecting: boolean;
	connected: boolean;
	account: WalletAccount;
}
export const walletState: WalletState = $state({
	isConnecting: false,
	connected: false,
	account: '',
	balance: -1n
});

export function resetWalletState() {
	walletState.isConnecting = false;
	walletState.connected = false;
	walletState.account = '';
	walletState.balance = -1n;
}
