<script>
	import EventsList from './EventsList.svelte';
	import EventsListItem from './EventsListItem.svelte';
	import EventInput from './EventInput.svelte';
	import {id} from '../../routes/_data.js';
	import {useSession} from '../session/context.js';

	const session = useSession();

	export let events;

	let titleValue = '';
	let contentValue = '';

	let titleEl;
	let contentEl;

	$: hasDraft = Boolean(titleValue || contentValue);

	const submit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit event', titleValue, contentValue);
		if (!titleValue) {
			titleEl.focus();
			return;
		}
		events = [
			{
				author: $session.person.slug,
				id: id(),
				title: titleValue,
				content: contentValue,
			},
			...events,
		];
		titleValue = '';
		contentValue = '';
		titleEl.focus();
	};

	const submitTitle = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		contentEl.focus();
	};
	const submitContent = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		submit(e); // TODO almost definitely want buttons instead
	};

	// TODO need a store per chat that saves the input state
</script>

<div>
	<EventInput
		bind:value={titleValue}
		bind:el={titleEl}
		submit={submitTitle}
		placeholder="name of your event • • •"
	/>
	<EventInput
		bind:value={contentValue}
		bind:el={contentEl}
		submit={submitContent}
		placeholder="event info • • •"
	/>
	<div>
		{#if hasDraft}
			<div class="draft">
				<EventsListItem
					event={{author: $session.person.slug, title: titleValue, content: contentValue}}
				/>
			</div>
		{/if}
		{#if events && events.length}
			<EventsList {events} />
		{:else}• • •{/if}
	</div>
</div>

<style>
	.draft {
		border: 3px solid purple;
	}
</style>
