<script lang="ts">
	import type {ForumReplyData} from '$lib/data';

	import WorldName from '../world/WorldName.svelte';
	import ForumReplies from './ForumReplies.svelte';

	export let reply: ForumReplyData;
	export let selectReply: ((reply: ForumReplyData) => void) | undefined = undefined;
	export let selected: boolean | undefined = undefined;
	export let classes = '';

	$: onReply = selectReply ? () => selectReply!(reply) : undefined;
</script>

<div class={classes} class:selected on:click={onReply}>
	<WorldName name={reply.author} classes="pr-2" />
	<span>
		{@html reply.content}
	</span>
	{#if reply.children}
		<ForumReplies parent={reply} />
	{/if}
</div>

<style>
	.reply {
		padding-left: 1rem;
	}
	.selected {
		border-width: 4px;
		border-color: #c6f6d5;
		border-bottom-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}
</style>
