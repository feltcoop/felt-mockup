<script>
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';
	import View from '../ui/View.svelte';

	export let world;
</script>

{#if !$world.view}
	<PlaceholderInfo>the community's main page goes here</PlaceholderInfo>
	<PlaceholderInfo>the community customizes the page & embeds/links to resources</PlaceholderInfo>
	<PlaceholderInfo>
		this page also has stuff like quick access to activity in @{$world.title}
	</PlaceholderInfo>
{/if}

{#if $world.content}{$world.content}{/if}

{#if $world.view}
	<View view={$world.view} />
{/if}
