<script>
	export let el = undefined;
	export let disabled = false;
	export let symbol = '+';
</script>

<button type="button" on:click bind:this={el} {disabled}>
	{#if symbol}<span>{symbol}</span>{/if}
	<span>
		<slot />
	</span>
</button>
