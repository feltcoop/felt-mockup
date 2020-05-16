<script>
	import Events from './Events.svelte';
	import {useWorld} from '../world/context.js';

	// TODO should this be removed and a single generic used in its place?
	export let view;

	const world = useWorld();

	// TODO points to a naming issue - "events.events" vs "forum.topic" and "chat.messages"
	$: eventsSpace = $world.spaces.find(s => s.slug === view.props.eventsSlug);
</script>

{#if eventsSpace}
	<Events events={eventsSpace.events} />
{/if}
