<script>
	import ForumReplies from './ForumReplies.svelte';
	import WorldName from '../world/WorldName.svelte';
	import ForumReplyComposer from './ForumReplyComposer.svelte';

	export let topic;
	export let addReply;

	// TODO need a store per chat that saves the input state
</script>

<div style="margin-bottom: 20px;">
	<div>
		<WorldName name={topic.author} />
		<div>{topic.title}</div>
	</div>
	{#if topic.content}
		<div>
			{@html topic.content}
		</div>
	{/if}
	<div>
		{#if addReply}
			<ForumReplyComposer {topic} {addReply} />
		{/if}
	</div>
	{#if topic.children}
		<ForumReplies parent={topic} />
	{/if}
</div>
