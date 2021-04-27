<script lang="ts">
	import type {InboxNoteData} from '$lib/data';

	export let note: InboxNoteData;
</script>

{#if note.title}
	<div>
		<span>{note.title}</span>
	</div>
{/if}
<div>
	{@html note.content}
</div>
