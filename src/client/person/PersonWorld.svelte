<script lang="ts">
	import View from '../ui/View.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';

	export let world;
</script>

{#if $world.content}{$world.content}{/if}

{#if $world.view}
	<View view={$world.view} />
{:else}
	<PlaceholderInfo>TODO insert default content</PlaceholderInfo>
{/if}
