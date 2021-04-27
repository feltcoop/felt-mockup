<script lang="ts">
	export let classes = '';
	export let el: HTMLButtonElement | undefined = undefined;
	export let disabled = false;
	export let symbol = '+';
</script>

<button
	class="clickable flex items-center italic {classes}"
	type="button"
	on:click
	bind:this={el}
	{disabled}
>
	{#if symbol}
		<span class="symbol">{symbol}</span>
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
	.symbol {
		font-size: 1.875rem;
		line-height: 1;
	}
</style>
