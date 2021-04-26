<script lang="ts">
	import InboxListItem from './InboxListItem.svelte';

	export let notes;
</script>

{#each notes as note}
	<div class="flex">
		<InboxListItem {note} />
	</div>
{/each}
