<script lang="ts">
	import ForumTopic from './ForumTopic.svelte';

	export let topic;
	export let addReply;
	export let selectReply;
	export let selection;
</script>

<!-- TODO currently we just inline everything -->

<div class="my-4">
	<ForumTopic {topic} {addReply} {selectReply} {selection} />
</div>
