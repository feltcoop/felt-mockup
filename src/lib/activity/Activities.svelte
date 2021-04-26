<script lang="ts">
	import ActivitiesList from './ActivitiesList.svelte';
	import ActivitiesListItem from './ActivitiesListItem.svelte';
	import ActivityInput from './ActivityInput.svelte';
	import {id} from '../../routes/_data.js';
	import {useSession} from '../session/context.js';

	const session = useSession();

	export let activities;
	export let classes = '';
	export let style = '';

	let value = '';

	const submit = (content, e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit activity content', content);
		activities = [{author: $session.person.slug, id: id(), content}, ...activities];
		value = '';
	};

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col {classes}" {style}>
	<ActivityInput bind:value {submit} placeholder="• • •" />
	<div
		class="overflow-y-scroll flex flex-col flex-1 border-4 border-purple-200
		rounded-bl-lg rounded-tr-lg"
	>
		{#if value}
			<div class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
				<ActivitiesListItem activity={{author: $session.person.slug, content: value}} />
			</div>
		{/if}
		{#if activities && activities.length}
			<ActivitiesList {activities} />
		{:else}• • •{/if}
	</div>
</div>
