<script lang="ts">
	import coffeeBg from '$lib/assets/coffee.png';
	import WalletConnector from '$lib/components/wallet/WalletConnector.svelte';
	import { fly, type TransitionConfig } from 'svelte/transition';

	function typewriter(node: Element, { speed }: { speed: number }): TransitionConfig {
		const text = node.textContent!;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

	let titleVisible = false;
	let showMetamask = false;

	setTimeout(() => {
		titleVisible = true;
	}, 1500);

	setTimeout(() => {
		showMetamask = true;
	}, 3000);
</script>

{#if !showMetamask}
	<div
		data-element="animation-wrapper"
		class="box-border flex h-full flex-col items-center justify-center"
		out:fly={{ y: -500, duration: 750 }}
	>
		<div class="cup" style={`background-image: url(${coffeeBg});`}>
			<span class="steam" style="--random-delay: 0.2;"></span>
			<span class="steam" style="--random-delay: 0.6;"></span>
			<span class="steam" style="--random-delay: 0.1;"></span>
			<div class="cup-handle"></div>
		</div>

		{#if titleVisible}
			<h1 class="h1 mt-8 text-[#92672e]" transition:typewriter={{ speed: 2 }}>EspressOS</h1>
		{/if}
	</div>
{:else}
	<div data-element="homepage-wrapper" class="flex h-full w-full items-center justify-center">
		<WalletConnector />
	</div>
{/if}

<style>
	@keyframes fillUp {
		0% {
			background-position: 0 130px;
		}

		100% {
			background-position: 600px -70px;
		}
	}

	@keyframes steaming {
		0% {
			opacity: 0;
			transform: translateY(0) scale(1);
		}

		50% {
			opacity: 1;
			filter: blur(1px);
			transform: translateY(-10px) scale(1.1) skewX(-2deg);
		}

		100% {
			opacity: 0;
			transform: translateY(-20px) scale(1.2) skewX(-4deg);
		}
	}

	.cup {
		position: relative;
		width: 220px;
		height: 180px;
		border: 8px solid #ffefdb;
		box-shadow: 0 0 0 8px #352a22;
		border-radius: 10px 10px 60px 75px;
		animation: fillUp 3s forwards;
		background-repeat: repeat-x;
		background-position: 0 130px;
	}

	.cup .cup-handle {
		position: absolute;
		width: 65px;
		height: 120px;
		top: 10px;
		right: -74px;
		border: 8px solid #352a22;
		border-radius: 20px 10px 50px 20px;
	}

	.steam {
		position: absolute;
		border-radius: 10px 2px;
		width: 8px;
		animation: steaming 2s infinite ease-in-out;
		animation-duration: calc(1.5s + 1s * var(--random-delay));
	}

	.steam:nth-child(1) {
		top: -70px;
		left: 65px;
		height: 30px;
		background: #8e5a3423;
		animation-delay: 0.2s;
	}

	.steam:nth-child(2) {
		top: -120px;
		left: 95px;
		height: 50px;
		background: #8e5a3454;
		animation-delay: 0.6s;
	}

	.steam:nth-child(3) {
		top: -90px;
		left: 125px;
		height: 40px;
		background: #8e5a3433;
		animation-delay: 1s;
	}
</style>
