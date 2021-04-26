<script lang="ts">
	import ActivitiesListItem from './ActivitiesListItem.svelte';

	export let activities;
</script>

{#each activities as activity}
	<ActivitiesListItem {activity} />
{/each}
