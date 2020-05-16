<script>
	import ForumReply from './ForumReply.svelte';

	export let parent;
</script>

{#each parent.children as reply}
	<ForumReply {reply} />
{/each}
