<script lang="ts">
	import Emojis from './Emojis.svelte';
	import {useWorld} from '../world/context.js';

	// TODO should this be removed and a single generic used in its place?
	export let view;

	const world = useWorld();

	$: emojisSpace = $world.spaces.find((s) => s.slug === view.props.emojisSlug);
</script>

{#if emojisSpace}
	<Emojis emojis={emojisSpace.emojis} values={emojisSpace.values} />
{/if}
