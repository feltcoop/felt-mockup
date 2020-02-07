<script>
	export let classes = '';
	export let el;
	export let disabled;
</script>

<button
	class="border-2 border-green-500 rounded-tl-sm rounded-br-sm rounded-bl-lg
	rounded-tr-lg text-primary font-bold px-3 pt-2 pb-3 relative hover:underline {classes}"
	{disabled}
	type="button"
	on:click
	bind:this={el}>
	<slot />
</button>

<style lang="postcss">
	button {
		box-shadow: 1px -1px 0 1px rgba(84, 153, 73, 0.75) inset;
	}
	button:active {
		box-shadow: 0 1px 0 1px rgba(84, 153, 73, 0.75) inset;
		top: 1px;
	}
</style>
