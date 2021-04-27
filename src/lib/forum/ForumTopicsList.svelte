<script lang="ts">
	import type {ForumReplyData, ForumTopicData} from '$lib/data';
	import type {SelectionStore} from '$lib/selection/store';

	import ForumTopicsListItem from './ForumTopicsListItem.svelte';

	export let topics: ForumTopicData[];
	export let addReply: (topic: ForumTopicData, reply: ForumReplyData) => void;
	export let selectReply: ((reply: ForumReplyData) => void) | undefined = undefined;
	export let selection: SelectionStore;
</script>

{#each topics as topic}
	<ForumTopicsListItem {topic} {addReply} {selectReply} {selection} />
{/each}
