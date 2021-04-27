<script lang="ts">
	import Chat from './Chat.svelte';
	import {useWorld} from '../world/context';

	// TODO should this be removed and a single generic used in its place?
	export let view;

	const world = useWorld();

	$: chat = $world.spaces.find((s) => s.slug === view.props.chatSlug);
	// $: console.log('chat', view, $world, chat);
</script>

{#if chat}
	<Chat messages={chat.messages} />
{/if}
