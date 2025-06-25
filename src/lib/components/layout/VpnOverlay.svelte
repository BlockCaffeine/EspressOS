<!-- src/lib/components/layout/VpnOverlay.svelte -->
<script lang="ts">
	import { vpnState } from '$lib/state/VpnState.svelte';
	import { Lock, RefreshCw } from '@lucide/svelte';

	// Kick off a fresh HEAD ping immediately
	async function retry() {
		if (vpnState.status === 'checking') return;
		vpnState.status = 'checking';
		try {
			// HEAD will go through our hook and set online/offline
			await fetch('https://fortuna.informatik.uni-mannheim.de:32779/', {
				method: 'HEAD',
				mode: 'no-cors',
				cache: 'no-store'
			});

			// Our proxy will update the status if successful, but TypeScript doesn't know about it.
			console.log(vpnState);
			// @ts-ignore
			if (vpnState.status === 'online') window.location.reload();
		} catch {
			// ignore, hook will have set vpnState to 'offline'
		}
	}
</script>

{#if vpnState.status === 'offline' || vpnState.status === 'checking'}
	<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
		<div class="absolute inset-0 bg-gray-800/30"></div>

		<div
			class="bg-opacity-90 relative mx-4 max-w-sm rounded-lg bg-white
             p-8 text-center shadow-xl backdrop-blur-sm"
		>
			<div class="mb-4 flex items-center justify-center space-x-2">
				<Lock class="h-6 w-6 text-amber-400" />
				<h2 class="text-2xl font-semibold text-gray-900">VPN Required</h2>
			</div>
			<p class="text-md mb-4 text-gray-700!">
				It seems you're not connected to the Uni-Mannheim network (VPN).
			</p>

			<button
				on:click={retry}
				class="btn bg-[#DCC6AE] disabled:opacity-50"
				disabled={vpnState.status === 'checking'}
			>
				{#if vpnState.status === 'checking'}
					<RefreshCw class="mr-2 h-5 w-5 animate-spin" />
					<span>Checking…</span>
				{:else}
					<RefreshCw class="mr-2 h-5 w-5" />
					<span>Retry VPN Connection</span>
				{/if}
			</button>
		</div>
	</div>
{/if}
