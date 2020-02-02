<script>
	import SecondaryNav from '@app/ui/SecondaryNav.svelte';
	import { useWorld } from '@app/world/context.js';
	import { provideSpace } from '@app/space/context.js';

	export let segment;

	const world = useWorld();

	const space = provideSpace($world.spaces.find(w => w.slug === segment));
	$: $space = segment
		? $world.spaces.find(w => w.slug === segment)
		: $world.spaces[0];
	// $: console.log('space', $space);
</script>

<SecondaryNav {segment} {world} />
<div class="flex flex-col flex-1">
	<slot />
</div>
