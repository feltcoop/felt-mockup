<script lang="ts">
	import type {EmojiData} from '$lib/data';
	import EmojisListItem from './EmojisListItem.svelte';

	export let emojis: EmojiData[];
</script>

<div class="flex items-center flex-wrap">
	{#each emojis as emoji}
		<EmojisListItem {emoji} />
	{/each}
</div>
