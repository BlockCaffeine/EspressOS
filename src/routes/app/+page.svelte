<script lang="ts">
	import coffeeBackground from '$lib/assets/coffee-pattern.avif';
</script>

<div
	class="border-surface-200-800 relative block max-w-md overflow-hidden rounded-2xl border bg-white/80 shadow-lg transition-shadow hover:shadow-xl"
	style={`background-image:
    linear-gradient(rgba(210,180,140,0.4), rgba(210,180,140,0.4)),
    url(${coffeeBackground});
    background-repeat: repeat;
    background-size: 200px;
    background-blend-mode: overlay;`}
>
	<article class="space-y-4 p-6">
		<div class="space-y-2">
			<h3 class="h3">Last Order</h3>
			<div class="mt-3 flex flex-row justify-between">
				<div class="flex flex-col justify-between text-sm">
					<span>Espresso ∙ 1 cup</span>
					<span>0.002 UMETH</span>
				</div>
				<button
					type="button"
					class="mt-2 inline-block rounded-full bg-[#dcb98c] px-5 py-2 font-medium text-white transition hover:bg-[#6f512a]"
				>
					Order Again
				</button>
			</div>
		</div>
	</article>
</div>
