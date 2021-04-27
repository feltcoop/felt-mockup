<script lang="ts">
	import type {InboxNoteData} from '$lib/data';
	import WorldName from '../world/WorldName.svelte';

	export let note: InboxNoteData;
</script>

<div class="spaced">
	<WorldName name={note.author} />
</div>
{#if note.title}
	<div class="spaced">{note.title}</div>
{/if}
<div>
	{@html note.content}
</div>

<style>
	.spaced {
		margin-right: 1rem;
	}
</style>
