<script lang="ts">
	import SecondaryNavItem from './SecondaryNavItem.svelte';

	export let segment;
	export let world;
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
