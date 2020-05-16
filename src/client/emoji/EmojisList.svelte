<script>
	import EmojisListItem from './EmojisListItem.svelte';

	export let emojis;
</script>

<div style="display: flex; flex-wrap: wrap; align-items: center;">
	{#each emojis as emoji}
		<EmojisListItem {emoji} />
	{/each}
</div>
