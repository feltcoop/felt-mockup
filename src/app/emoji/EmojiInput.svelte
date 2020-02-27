<script>
	import { sizes, sizeClasses } from './emoji.js';

	export let values;
	export let submit = undefined;
	export let classes = '';

	let lastValue;
	let toggle = false;
	const getSizeClass = (sizeClasses, size, value) => {
		if (lastValue !== value) {
			lastValue = value;
			toggle = !toggle;
		}
		return toggle ? sizeClasses[size] : sizeClasses[sizes.length - size + 1];
	};
</script>

<div class="flex flex-wrap items-center {classes}">
	{#each values as value}
		{#each sizes as size}
			<button
				class={getSizeClass(sizeClasses, size, value)}
				on:click={() => submit(value, size)}>
				{value}
			</button>
		{/each}
	{/each}
</div>

<style>
	button:hover {
		outline: 6px dotted rgb(198, 246, 213); /* TODO add class? tailwind keeps me wanting @apply outline-green-700 */
	}
	button:focus {
		outline: 6px dotted #b794f4; /* TODO add class? tailwind keeps me wanting @apply outline-purple-400 */
	}
</style>
