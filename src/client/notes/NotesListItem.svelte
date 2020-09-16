<script>
	export let note;
</script>

{#if note.title}
	<div><span>{note.title}</span></div>
{/if}
<div>
	{@html note.content}
</div>
