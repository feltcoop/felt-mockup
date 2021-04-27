<script lang="ts">
	import Forum from './Forum.svelte';
	import {useWorld} from '../world/context';
	import type {ForumSpaceData, ViewData} from '$lib/data';

	// TODO should this be removed and a single generic used in its place?
	export let view: ViewData;

	const world = useWorld();

	let forum: ForumSpaceData | undefined;
	$: forum = $world.spaces.find((s) => s.slug === (view.props as any).forumSlug) as
		| ForumSpaceData
		| undefined;
</script>

{#if forum}
	<Forum topics={forum.topics} />
{/if}
