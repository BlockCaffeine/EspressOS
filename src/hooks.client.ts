import 'viem/window';
import { vpnState } from '$lib/state/VpnState.svelte';
import type { HandleClientError } from '@sveltejs/kit';

const VPN_HOST = 'fortuna.informatik.uni-mannheim.de';
const originalFetch = window.fetch.bind(window);

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
	const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

	if (url.includes(VPN_HOST)) {
		// skip OPTIONS preflights
		const method = (init?.method ?? 'GET').toUpperCase();
		if (method === 'OPTIONS') {
			return originalFetch(input, init);
		}

		// if we already know VPN is offline, fast-fail
		if (vpnState.status === 'offline') {
			return Promise.reject(new Error('VPN is offline'));
		}

		// special timeout logic for HEAD
		if (method === 'HEAD') {
			const controller = new AbortController();
			const signal = controller.signal;
			const timer = setTimeout(() => controller.abort(), 5000);

			try {
				const res = await originalFetch(input, { ...init, signal });
				vpnState.status = res.status <= 500 ? 'online' : 'offline';
				return res;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				// if we hit the timeout, AbortError is thrown
				if (err.name === 'AbortError') {
					vpnState.status = 'offline';
					throw new Error('VPN check timed out after 5 seconds');
				}
				vpnState.status = 'offline';
				throw err;
			} finally {
				clearTimeout(timer);
			}
		}

		// for GET/POST/etc, do the normal behavior
		try {
			const res = await originalFetch(input, init);
			vpnState.status = res.status <= 500 ? 'online' : 'offline';
			return res;
		} catch (err) {
			vpnState.status = 'offline';
			throw err;
		}
	}

	return originalFetch(input, init);
};

export const handleError: HandleClientError = ({ error }) => {
	console.error(error);
};
