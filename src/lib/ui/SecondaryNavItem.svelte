<script lang="ts">
	import type {Writable} from 'svelte/store';

	import type {SpaceData, WorldData} from '$lib/data';
	import {symbols} from '../ui/symbols';

	export let segment: string;
	export let world: Writable<WorldData>;
	export let space: SpaceData;

	$: isSelected = segment === space.slug;
	$: selectedClasses = isSelected
		? 'border-purple-200 hover:border-purple-200' // TODO more elegant way to override?
		: 'border-transparent';

	// https://jrgraphix.net/r/Unicode/2600-26FF
	// trees! '🌲', '🌳', '🌴'
	// '♣' - club..group chat?
</script>

<li>
	<a
		class="flex items-center pt-1 pb-1 pr-2 rounded-bl-lg rounded-tr-lg
		border-dashed border-r-2 border-l-4 border-t-2 border-b-4 border-tr-lg
		border-bl-lg hover:bg-green-100 hover:border-green-200 {selectedClasses}"
		class:selected={isSelected}
		href="{$world.slug}/{space.slug}"
	>
		<div class="w-8 text-center text-gray-400" class:text-purple-300={isSelected}>
			{symbols[space.type] || symbols.other}
		</div>
		<div class="title">{space.title}</div>
	</a>
</li>

<style>
	a {
		color: inherit;
		width: 100%;
		height: 100%;
		position: relative;
	}
	a.selected {
		color: #6b46c1;
		cursor: default;
		background-color: #faf5ff;
	}
	a:hover .title {
		text-decoration: underline;
	}
	a:active {
		top: 2px;
		border-color: #9ae6b4;
	}
	a.selected:active {
		top: -2px;
		border-color: #d6bcfa;
	}
</style>
