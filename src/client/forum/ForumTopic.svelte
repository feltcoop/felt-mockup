<script>
	import ForumReplies from './ForumReplies.svelte';
	import WorldName from '../world/WorldName.svelte';
	import ForumReplyComposer from './ForumReplyComposer.svelte';
	// import ForumInput from './ForumInput.svelte';

	export let topic;
	export let addReply;
	export let selectReply;
	export let selection;

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col">
	<div class="flex text-xl">
		<WorldName name={topic.author} classes="pr-3" />
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
		<!-- <button
			class="border border-primary text-primary font-bold p-3"
			type="button">
			+ reply
		</button> -->
	</div>
	<!-- <ForumInput bind:value {submit} /> -->
	{#if topic.children}
		<ForumReplies parent={topic} {selectReply} {selection} />
	{/if}
</div>
