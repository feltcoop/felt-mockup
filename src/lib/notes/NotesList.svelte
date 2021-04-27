<script lang="ts">
	import NotesListItem from './NotesListItem.svelte';
	import type {InboxNoteData} from '$lib/data';

	export let notes: InboxNoteData[];
</script>

{#each notes as note}
	<NotesListItem {note} />
{/each}
