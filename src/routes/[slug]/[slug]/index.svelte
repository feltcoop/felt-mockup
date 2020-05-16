<script>
	import Space from '../../../client/space/Space.svelte';
	import {useWorld} from '../../../client/world/context.js';
	import {useSpace} from '../../../client/space/context.js';

	const world = useWorld();
	const space = useSpace();
</script>

<svelte:head>
	<title>felt / {$world.title} / {$space.title}</title>
</svelte:head>

<Space {world} {space} />
