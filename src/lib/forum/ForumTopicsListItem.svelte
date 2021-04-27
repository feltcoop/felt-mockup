<script lang="ts">
	import type {ForumReplyData, ForumTopicData} from '$lib/data';
	import type {SelectionStore} from '$lib/selection/store';

	import ForumTopic from './ForumTopic.svelte';

	export let topic: ForumTopicData;
	export let addReply:
		| ((topic: ForumTopicData, reply: ForumReplyData) => void)
		| undefined = undefined;
	export let selectReply: ((reply: ForumReplyData) => void) | undefined = undefined;
	export let selection: SelectionStore | undefined = undefined;
</script>

<!-- TODO currently we just inline everything -->

<div>
	<ForumTopic {topic} {addReply} {selectReply} {selection} />
</div>

<style>
	div {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
