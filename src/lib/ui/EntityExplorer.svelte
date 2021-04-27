<script lang="ts">
	import type {Entity} from '$lib/data';
	import JsonExplorer from '../json/JsonExplorer.svelte';

	// TODO linkify and otherwise enrich this data,
	// starting with id references and world slugs

	export let entity: Entity;
</script>

<div class="font-mono">
	<JsonExplorer json={entity} />
</div>
