<script>
	export let isSelected;
	export let href;
</script>

<a class:selected={isSelected} {href}>
	<slot />
</a>

<style>
	a {
		display: flex;
	}
	.selected {
		font-weight: bold;
	}
</style>
