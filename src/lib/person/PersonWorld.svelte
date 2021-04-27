<script lang="ts">
	import type {Writable} from 'svelte/store';

	import type {WorldData} from '$lib/data';
	import View from '../ui/View.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';

	export let world: Writable<WorldData>;
</script>

{#if $world.content}{$world.content}{/if}

{#if $world.view}
	<View view={$world.view} />
{:else}
	<PlaceholderInfo>TODO insert default content</PlaceholderInfo>
{/if}
