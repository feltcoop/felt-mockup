<script>
	import ActivitiesList from './ActivitiesList.svelte';
	import ActivitiesListItem from './ActivitiesListItem.svelte';
	import ActivityInput from './ActivityInput.svelte';
	import {id} from '../../routes/_data.js';
	import {useSession} from '../session/context.js';

	const session = useSession();

	export let activities;

	let value = '';

	const submit = (content, e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit activity content', content);
		activities = [
			{author: $session.person.slug, id: id(), content},
			...activities,
		];
		value = '';
	};

	// TODO need a store per chat that saves the input state
</script>

<div>
	<ActivityInput bind:value {submit} placeholder="• • •" />
	<div>
		{#if value}
			<div class="draft">
				<ActivitiesListItem
					activity={{author: $session.person.slug, content: value}} />
			</div>
		{/if}
		{#if activities && activities.length}
			<ActivitiesList {activities} />
		{:else}• • •{/if}
	</div>
</div>

<style>
	.draft {
		border: 3px solid purple;
	}
</style>
