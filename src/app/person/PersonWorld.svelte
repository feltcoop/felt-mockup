<script>
	import EntityExplorer from '../ui/EntityExplorer.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';

	export let world;

	let subpage = 0;
</script>

<div class="flex flex-col">
	<label class="flex items-center">
		<input type="radio" bind:group={subpage} class="mr-2" value={0} />
		<PlaceholderInfo interactive={true}>
			show {$world.title}'s custom homepage and other helpful info
		</PlaceholderInfo>
	</label>
	<label class="flex items-center">
		<input type="radio" bind:group={subpage} class="mr-2" value={1} />
		<PlaceholderInfo interactive={true}>show raw data</PlaceholderInfo>
	</label>
</div>

{#if subpage === 0}
	<PlaceholderInfo>
		TODO show {$world.title}'s custom homepage and other helpful info
	</PlaceholderInfo>
{:else}
	<EntityExplorer entity={$world} />
{/if}

{#if $world.content}{$world.content}{/if}
