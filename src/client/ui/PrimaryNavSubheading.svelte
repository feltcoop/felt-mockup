<script>
	export let isOpen;
	export let isSelected;
</script>

<div class:selected={isSelected} on:click>
	<slot />
	{isOpen ? '' : '+'}
</div>

<style>
	div {
		display: flex;
		white-space: nowrap;
	}
	.selected {
		font-weight: bold;
	}
</style>
