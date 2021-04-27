<script lang="ts">
	import type {Writable} from 'svelte/store';

	import type {WorldData} from '$lib/data';
	import SecondaryNavItem from './SecondaryNavItem.svelte';

	export let segment: string;
	export let world: Writable<WorldData>;
</script>

<nav class="pt-2 pl-2">
	<ul>
		{#each $world.spaces as space}
			<SecondaryNavItem {space} {segment} {world} />
		{/each}

		<!-- TODO put these in the data -->
		<!-- {#if $world.type === 'persona'}
			<li>
				<a>scratchpad</a>
			</li>
			<li>
				<a>drafts</a>
			</li>
			<li>
				<a>notifications</a>
			</li>
		{/if} -->
	</ul>
</nav>

<style>
	nav {
		height: 100%;
	}
</style>
