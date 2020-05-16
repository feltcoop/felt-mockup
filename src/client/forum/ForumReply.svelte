<script>
	import WorldName from '../world/WorldName.svelte';
	import ForumReplies from './ForumReplies.svelte';

	export let reply;
</script>

<div>
	<WorldName name={reply.author} />
	<span>
		{@html reply.content}
	</span>
	{#if reply.children}
		<ForumReplies parent={reply} />
	{/if}
</div>
