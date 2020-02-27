<script>
	import EmojisListItem from './EmojisListItem.svelte';

	export let emojis;
</script>

<div class="flex items-center flex-wrap">
	{#each emojis as emoji}
		<EmojisListItem {emoji} />
	{/each}
</div>
