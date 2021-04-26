<script lang="ts">
	import WorldName from '../world/WorldName.svelte';
	import ForumReplies from './ForumReplies.svelte';

	export let reply;
	export let selectReply;
	export let isSelected;
	export let classes = '';

	$: selectedClasses = isSelected ? 'border-4 border-green-200 rounded-bl-lg rounded-tr-lg' : '';
</script>

<div
	class="pl-4 {classes}
	{selectedClasses}"
	on:click={selectReply ? () => selectReply(reply) : undefined}
>
	<WorldName name={reply.author} classes="pr-2" />
	<span>
		{@html reply.content}
	</span>
	{#if reply.children}
		<ForumReplies parent={reply} />
	{/if}
</div>
