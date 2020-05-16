<script>
	export let values;
	export let submit = undefined;

	$: items = values
		.map((value, i) => {
			const isGrowing = !(i % 2);
			const result = [{size: 1, value}, {size: 2, value}, {size: 3, value}];
			if (!isGrowing) result.reverse();
			return result;
		})
		.flat();
</script>

<div style="display: flex; flex-wrap: wrap; align-items: center;">
	{#each items as item}
		<button
			class={'size-' + item.size}
			on:click={() => submit(item.value, item.size)}>
			{item.value}
		</button>
	{/each}
</div>

<style>
	.size-1 {
		font-size: 1em;
	}
	.size-2 {
		font-size: 2em;
	}
	.size-3 {
		font-size: 3em;
	}
</style>
