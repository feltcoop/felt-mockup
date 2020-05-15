<script>
	import { sizes, sizeClasses } from './emoji.js';

	export let values;
	export let submit = undefined;
	export let classes = '';

	$: items = values
		.map((value, i) => {
			const isGrowing = !(i % 2);
			const result = [
				{ size: 1, value, classes: sizeClasses[1] },
				{ size: 2, value, classes: sizeClasses[2] },
				{ size: 3, value, classes: sizeClasses[3] },
			];
			if (!isGrowing) result.reverse();
			return result;
		})
		.flat();
</script>

<div class="flex flex-wrap items-center {classes}">
	{#each items as item}
		<button
			class="clickable {item.classes}"
			on:click={() => submit(item.value, item.size)}>
			{item.value}
		</button>
	{/each}
</div>

<style>
	button:hover {
		outline: 6px dotted rgb(198, 246, 213); /* TODO add class? @apply outline-green-700 */
	}
	button:focus {
		outline: 6px dotted #b794f4; /* TODO add class? @apply outline-purple-400 */
	}
</style>
