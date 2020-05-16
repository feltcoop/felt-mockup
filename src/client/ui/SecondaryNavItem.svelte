<script>
	import {symbols} from '../ui/symbols.js';

	export let segment;
	export let world;
	export let space;

	$: isSelected = segment === space.slug;
</script>

<a class:selected={isSelected} href="{$world.slug}/{space.slug}">
	{symbols[space.type] || symbols.other} {space.title}
</a>

<style>
	a {
		display: flex;
	}
	.selected {
		font-weight: bold;
	}
</style>
