<script lang="ts">
	import type {ActivityData} from '$lib/data';
	import WorldName from '../world/WorldName.svelte';

	export let activity: ActivityData;
</script>

<div>
	<WorldName name={activity.author} classes="mr-2" />
	{@html activity.content}
</div>

<style>
	div {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
</style>
