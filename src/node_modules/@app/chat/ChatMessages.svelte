<script>
	import ChatMessage from './ChatMessage.svelte';

	export let messages;
</script>

{#each messages as message}
	<ChatMessage {message} />
{/each}
