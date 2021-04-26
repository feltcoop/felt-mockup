<script lang="ts">
	import ChatMessage from './ChatMessage.svelte';

	export let messages;
	export let selectMessage;
	export let selection;
</script>

{#each messages as message}
	<ChatMessage {message} {selectMessage} isSelected={selection.test(message, $selection)} />
{/each}
