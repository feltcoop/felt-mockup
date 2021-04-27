<script lang="ts">
	import type {EventData} from '$lib/data';
	import EventsListItem from './EventsListItem.svelte';

	export let events: EventData[];
</script>

{#each events as event}
	<EventsListItem {event} />
{/each}
