<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ApexCharts from 'apexcharts';
	import type { StackedChartData } from '$lib/state/StatsState.svelte';

	interface ChartProps {
		data: StackedChartData;
	}

	const { data }: ChartProps = $props();

	let chartEl: HTMLDivElement;
	let chart: ApexCharts;

	onMount(() => {
		const options: ApexCharts.ApexOptions = {
			chart: {
				type: 'bar',
				height: 320,
				stacked: true,
				toolbar: { show: false }
			},
			series: data.series,
			xaxis: {
				categories: data.labels,
				labels: { rotate: -45 }
			},
			plotOptions: {
				bar: {
					distributed: false,
					borderRadius: 4
				}
			},
			colors: data.colors,
			dataLabels: { enabled: false },
			tooltip: {
				y: { formatter: (val: number) => val.toString() }
			}
		};

		chart = new ApexCharts(chartEl, options);
		chart.render();
	});

	// whenever `data` changes, update the chart in place
	$effect(() => {
		chart.updateOptions(
			{
				series: data.series,
				xaxis: { categories: data.labels },
				colors: data.colors
			},
			false,
			true
		);
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<div bind:this={chartEl}></div>
