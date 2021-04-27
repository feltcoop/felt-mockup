<script lang="ts">
	import type {ChatMessageData} from '$lib/data';
	import type {SelectionStore} from '$lib/selection/store';

	import ChatMessage from './ChatMessage.svelte';

	export let messages: ChatMessageData[];
	export let selectMessage: ((message: ChatMessageData) => void) | undefined = undefined;
	export let selection: SelectionStore;
</script>

{#each messages as message}
	<ChatMessage {message} {selectMessage} selected={selection.test(message, $selection)} />
{/each}
