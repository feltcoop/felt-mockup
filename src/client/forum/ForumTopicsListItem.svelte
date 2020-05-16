<script>
	import ForumTopic from './ForumTopic.svelte';

	export let topic;
	export let addReply;
	export let selectReply;
	export let selection;
</script>

<ForumTopic {topic} {addReply} {selectReply} {selection} />
