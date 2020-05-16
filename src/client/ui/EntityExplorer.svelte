<script>
	import JsonExplorer from '../json/JsonExplorer.svelte';

	// TODO linkify and otherwise enrich this data,
	// starting with id references and world slugs

	export let entity;
</script>

<div>
	<JsonExplorer json={entity} />
</div>
