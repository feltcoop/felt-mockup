<script>
	import SecondaryNavItem from './SecondaryNavItem.svelte';

	export let segment;
	export let world;
</script>

<nav>
	{#each $world.spaces as space}
		<SecondaryNavItem {space} {segment} {world} />
	{/each}
</nav>
