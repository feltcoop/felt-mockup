<script>
	import Space from '@app/space/Space.svelte';
	import { useWorld } from '@app/world/context.js';
	import { useSpace } from '@app/space/context.js';

	const world = useWorld();
	const space = useSpace();
</script>

<svelte:head>
	<title>felt / {$world.title} / {$space.title}</title>
</svelte:head>

<Space {world} {space} />
