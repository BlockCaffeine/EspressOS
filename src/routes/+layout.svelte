<script lang="ts">
	import LightSwitch from '$lib/components/lightswitch/LightSwitch.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
<LightSwitch />

{@render children()}
