<script>
	import EntityExplorer from '../ui/EntityExplorer.svelte';

	export let world;
</script>

<EntityExplorer entity={$world} />

{#if $world.content}{$world.content}{/if}
