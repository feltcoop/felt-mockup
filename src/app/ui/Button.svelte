<script>
	export let classes = '';
	export let el;
	export let disabled;
</script>

<!-- TODO custom colors -->
<button
	class="border-2 border-green-300 rounded-tl-sm rounded-br-sm rounded-bl-lg
	rounded-tr-lg text-green-500 font-bold px-3 pt-2 pb-3 relative hover:underline
	focus:underline {classes}"
	{disabled}
	type="button"
	on:click
	bind:this={el}>
	<slot />
</button>

<style>
	button {
		box-shadow: 1px -1px 0 1px #9ae6b4 inset;
	}
	button:active {
		box-shadow: 0 1px 0 1px #9ae6b4 inset;
		top: 2px;
	}
	button:focus {
		outline: 4px dotted #9ae6b4;
	}
</style>
