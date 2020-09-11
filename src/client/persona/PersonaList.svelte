<script>
	export let personas;
</script>

<h2>personas</h2>
<ul>
	{#each personas as persona}
		<li>{persona.name}</li>
	{/each}
</ul>
