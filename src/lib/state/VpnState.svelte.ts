export type VpnStatus = 'checking' | 'online' | 'offline';

export interface VpnState {
	status: VpnStatus;
}
export const vpnState: VpnState = $state({
	status: 'checking'
});

export function resetWalletState() {
	vpnState.status = 'checking';
}
