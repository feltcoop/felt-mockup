<script lang="ts">
	import type {InboxNoteData} from '$lib/data';
	import InboxListItem from './InboxListItem.svelte';

	export let notes: InboxNoteData[];
</script>

{#each notes as note}
	<div class="flex">
		<InboxListItem {note} />
	</div>
{/each}
