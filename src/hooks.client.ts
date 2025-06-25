import 'viem/window';
import { vpnState } from '$lib/state/VpnState.svelte';
import type { HandleClientError } from '@sveltejs/kit';

// save the real fetch
const originalFetch = window.fetch.bind(window);

// override the global fetch to apply a client-side validation for the vpn state
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
	// turn the input into a string URL
	const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

	if (url.includes('fortuna.informatik.uni-mannheim.de')) {
		try {
			const res = await originalFetch(input, init);
			vpnState.status = res.ok ? 'online' : 'offline';
			return res;
		} catch (e) {
			vpnState.status = 'offline';
			throw e;
		}
	}

	// everything else just proxies through
	return originalFetch(input, init);
};

// export something so SvelteKit recognizes
// this as a client hooks file:
export const handleError: HandleClientError = ({ error }) => {
	console.error(error);
};
