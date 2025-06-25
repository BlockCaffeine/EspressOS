export type VpnStatus = 'checking' | 'online' | 'offline' | 'initial';

export interface VpnState {
	status: VpnStatus;
}
export const vpnState: VpnState = $state({
	status: 'initial'
});

export function resetWalletState() {
	vpnState.status = 'initial';
}
