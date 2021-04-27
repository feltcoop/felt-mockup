<script lang="ts">
	import WorldName from '../world/WorldName.svelte';
	import {symbols} from '../ui/symbols';
	import type {ChatMessageData} from '$lib/data';

	export let message: ChatMessageData;
	export let selectMessage: ((message: ChatMessageData) => void) | undefined = undefined;
	export let selected: boolean | undefined = undefined;
	export let classes = '';

	$: select = selectMessage ? () => selectMessage!(message) : undefined;
</script>

<div class="chat-message {classes}" on:click={select} class:selected>
	<span class="inner">
		{#if message.author === symbols.persona}
			<span class="persona">{symbols.persona}</span>
		{:else}
			<WorldName name={message.author} />
		{/if}
	</span>
	{@html message.content}
</div>

<style>
	.chat-message {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	.selected {
		border-width: 4px;
		border-color: #c6f6d5;
		border-bottom-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}
	.inner {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.persona {
		font-size: 1.5rem;
		line-height: 1;
	}
</style>
