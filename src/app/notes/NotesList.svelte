<script>
	import NotesListItem from './NotesListItem.svelte';

	export let notes;
</script>

{#each notes as note}
	<NotesListItem {note} />
{/each}
