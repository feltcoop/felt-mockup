<script>
	import WorldName from '../world/WorldName.svelte';

	export let note;
</script>

<div>
	<WorldName name={note.author} />
</div>
{#if note.title}
	<div>{note.title}</div>
{/if}
<div>
	{@html note.content}
</div>
