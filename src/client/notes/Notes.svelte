<script>
	import NotesList from './NotesList.svelte';
	import NotesInput from './NotesInput.svelte';
	import NotesListItem from './NotesListItem.svelte';
	import {id} from '../../routes/_data.js';
	import {useSession} from '../session/context.js';

	// TODO should type="inbox" be type="activity"?

	export let notes;

	const session = useSession();

	let value = '';

	const submit = (content, e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit content', content);
		notes = [
			{type: 'note', author: $session.person.slug, id: id(), content},
			...notes,
		];
		value = '';
	};

	// TODO need a store per chat that saves the input state
</script>

<NotesInput bind:value {submit} />
{#if value}
	<div class="draft">
		<NotesListItem note={{author: $session.person.slug, content: value}} />
	</div>
{/if}
{#if notes && notes.length}
	<div>
		<NotesList {notes} />
	</div>
{:else}• • •{/if}

<style>
	.draft {
		border: 3px solid purple;
	}
</style>
