<script lang="ts">
	import Chat from './Chat.svelte';
	import {useWorld} from '../world/context';
	import type {ChatSpaceData, ViewData} from '$lib/data';

	// TODO should this be removed and a single generic used in its place?
	export let view: ViewData;

	const world = useWorld();

	let chat: ChatSpaceData | undefined;
	$: chat = $world.spaces.find((s) => s.slug === (view.props as any).chatSlug) as ChatSpaceData;
	// $: console.log('chat', view, $world, chat);
</script>

{#if chat}
	<Chat messages={chat.messages} />
{/if}
