<script lang="ts">
	import type {ActivityData} from '$lib/data';
	import ActivitiesListItem from './ActivitiesListItem.svelte';

	export let activities: ActivityData[];
</script>

{#each activities as activity}
	<ActivitiesListItem {activity} />
{/each}
