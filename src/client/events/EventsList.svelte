<script lang="ts">
	import EventsListItem from './EventsListItem.svelte';

	export let events;
</script>

{#each events as event}
	<EventsListItem {event} />
{/each}
