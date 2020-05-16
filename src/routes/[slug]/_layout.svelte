<script>
	import SecondaryNav from '../../client/ui/SecondaryNav.svelte';
	import {useWorld} from '../../client/world/context.js';
	import {provideSpace} from '../../client/space/context.js';

	export let segment;

	const world = useWorld();

	const space = provideSpace($world.spaces.find(w => w.slug === segment));
	$: $space = segment
		? $world.spaces.find(w => w.slug === segment)
		: $world.spaces[0];
	// $: console.log('space', $space);
</script>

<SecondaryNav {segment} {world} />
<div>
	<slot />
</div>
