<script>
	export let classes = '';
	export let el = undefined;
	export let disabled = false;
	export let symbol = '+';
</script>

<button
	class="clickable flex items-center italic {classes}"
	type="button"
	on:click
	bind:this={el}
	{disabled}>
	{#if symbol}
		<span class="text-3xl leading-none">{symbol}</span>
	{/if}
	<span class="content">
		<slot />
	</span>
</button>

<style>
	button:hover .content {
		text-decoration: underline;
	}
	button:focus {
		outline: 3px dotted rgba(0, 0, 0, 0.4);
	}
</style>
