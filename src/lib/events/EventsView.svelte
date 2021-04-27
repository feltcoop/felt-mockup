<script lang="ts">
	import Events from './Events.svelte';
	import {useWorld} from '../world/context';
	import type {EventSpaceData, ViewData} from '$lib/data';

	// TODO should this be removed and a single generic used in its place?
	export let view: ViewData;

	const world = useWorld();

	// TODO points to a naming issue - "events.events" vs "forum.topic" and "chat.messages"
	let eventsSpace: EventSpaceData | undefined;
	$: eventsSpace = $world.spaces.find((s) => s.slug === (view.props as any).eventsSlug) as
		| EventSpaceData
		| undefined;
</script>

{#if eventsSpace}
	<Events events={eventsSpace.events} />
{/if}
