<script>
	export let communities;
</script>

<h2>communities</h2>
<ul>
	{#each communities as community}
		<li>{community.name}</li>
	{/each}
</ul>
