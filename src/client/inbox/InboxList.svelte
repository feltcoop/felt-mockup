<script>
	import InboxListItem from './InboxListItem.svelte';

	export let notes;
</script>

{#each notes as note}
	<InboxListItem {note} />
{/each}
