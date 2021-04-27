<script lang="ts">
	import Emojis from './Emojis.svelte';
	import {useWorld} from '../world/context';
	import type {EmojiSpaceData, ViewData} from '$lib/data';

	// TODO should this be removed and a single generic used in its place?
	export let view: ViewData;

	const world = useWorld();

	let emojisSpace: EmojiSpaceData | undefined;
	$: emojisSpace = $world.spaces.find((s) => s.slug === (view.props as any).emojisSlug) as
		| EmojiSpaceData
		| undefined;
</script>

{#if emojisSpace}
	<Emojis emojis={emojisSpace.emojis} values={emojisSpace.values} />
{/if}
