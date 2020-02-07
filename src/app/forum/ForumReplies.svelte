<script>
	import ForumReply from './ForumReply.svelte';

	export let parent;
	export let selectReply;
	export let selection;
</script>

{#each parent.children as reply}
	<ForumReply
		{reply}
		{selectReply}
		isSelected={selection ? selection.test(reply, $selection) : false} />
{/each}
