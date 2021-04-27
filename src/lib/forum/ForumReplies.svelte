<script lang="ts">
	import type {ForumReplyData, ForumTopicData} from '$lib/data';
	import type {SelectionStore} from '$lib/selection/store';

	import ForumReply from './ForumReply.svelte';

	export let parent: ForumReplyData | ForumTopicData;
	export let selectReply: ((reply: ForumReplyData) => void) | undefined = undefined;
	export let selection: SelectionStore | undefined = undefined;

	$: children = parent.children!;
</script>

{#each children as reply}
	<ForumReply
		{reply}
		{selectReply}
		selected={selection ? selection.test(reply, $selection) : false}
	/>
{/each}
