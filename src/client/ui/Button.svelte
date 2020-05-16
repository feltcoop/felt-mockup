<script>
	export let el = undefined;
	export let disabled = false;
</script>

<!-- TODO custom colors -->
<button {disabled} type="button" on:click bind:this={el}>
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
