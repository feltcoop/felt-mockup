<script lang="ts">
	import ForumReply from './ForumReply.svelte';

	export let parent;
	export let selectReply = undefined;
	export let selection = undefined;
</script>

{#each parent.children as reply}
	<ForumReply
		{reply}
		{selectReply}
		isSelected={selection ? selection.test(reply, $selection) : false}
	/>
{/each}
