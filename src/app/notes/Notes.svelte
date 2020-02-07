<script>
	import NotesList from './NotesList.svelte';
	import NotesInput from './NotesInput.svelte';
	import NotesListItem from './NotesListItem.svelte';
	import WorldName from '../world/WorldName.svelte';
	import { id } from '../../routes/_data.js';
	import { useSession } from '../session/context.js';

	// TODO should type="inbox" be type="activity"?

	export let notes;

	const session = useSession();

	export let value = '';

	const submit = (content, e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit content', content);
		notes = [
			{ type: 'note', author: $session.person.slug, id: id(), content },
			...notes,
		];
		value = '';
	};

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col h-full">
	<NotesInput bind:value {submit} />
	{#if value}
		<div class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
			<NotesListItem note={{ author: $session.person.slug, content: value }} />
		</div>
	{/if}
	<div class="overflow-y-scroll flex flex-col justify-start flex-1">
		<NotesList {notes} />
	</div>
</div>
