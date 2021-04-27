<script lang="ts">
	import SecondaryNav from '$lib/ui/SecondaryNav.svelte';
	import {useWorld} from '$lib/world/context';
	import {provideSpace} from '$lib/space/context';

	export let segment;

	const world = useWorld();

	const space = provideSpace($world.spaces.find((w) => w.slug === segment));
	$: $space = segment ? $world.spaces.find((w) => w.slug === segment) : $world.spaces[0];
	// $: console.log('space', $space);
</script>

<SecondaryNav {segment} {world} />
<div class="flex flex-col flex-1">
	<slot />
</div>
