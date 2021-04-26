<script lang="ts">
	import Forum from './Forum.svelte';
	import {useWorld} from '../world/context.js';

	// TODO should this be removed and a single generic used in its place?
	export let view;

	const world = useWorld();

	$: forum = $world.spaces.find((s) => s.slug === view.props.forumSlug);
</script>

{#if forum}
	<Forum topics={forum.topics} />
{/if}
