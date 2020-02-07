<script>
	import EntityExplorer from '../ui/EntityExplorer.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';

	export let world;
</script>

<PlaceholderInfo>the community's main page goes here</PlaceholderInfo>
<PlaceholderInfo>
	the community customizes the page & embeds/links to resources
</PlaceholderInfo>
<PlaceholderInfo>
	this page also has stuff like quick access to activity in @{$world.title}
</PlaceholderInfo>

{#if $world.content}{$world.content}{/if}
