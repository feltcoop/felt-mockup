<script lang="ts">
	import type {Writable} from 'svelte/store';

	import type {WorldData} from '$lib/data';
	import EntityExplorer from '../ui/EntityExplorer.svelte';
	import View from '../ui/View.svelte';

	export let world: Writable<WorldData>;
</script>

<EntityExplorer entity={$world} />

{#if $world.content}{$world.content}{/if}

{#if $world.view}
	<View view={$world.view} />
{/if}
