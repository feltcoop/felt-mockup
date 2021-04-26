<script lang="ts">
	import EntityExplorer from '../ui/EntityExplorer.svelte';
	import View from '../ui/View.svelte';

	export let world;
</script>

<EntityExplorer entity={$world} />

{#if $world.content}{$world.content}{/if}

{#if $world.view}
	<View view={$world.view} />
{/if}
