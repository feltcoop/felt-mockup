<script>
	export let classes = '';
	export let el;
	export let disabled;
	export let symbol = '+';
</script>

<button
	class="flex items-center hover:underline italic {classes}"
	type="button"
	on:click
	bind:this={el}
	{disabled}>
	{#if symbol}
		<span class="text-3xl leading-none">{symbol}</span>
	{/if}
	<slot />
</button>

<style>
	button:hover {
		transform: scale3d(1.05, 1.05, 1);
	}
	button:active {
		transform: scale3d(0.95, 0.95, 1);
	}
</style>
