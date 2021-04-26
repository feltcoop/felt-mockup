<script lang="ts">
	import Space from '$lib/space/Space.svelte';
	import {useWorld} from '$lib/world/context.js';
	import {useSpace} from '$lib/space/context.js';

	const world = useWorld();
	const space = useSpace();
</script>

<svelte:head>
	<title>felt / {$world.title} / {$space.title}</title>
</svelte:head>

<Space {world} {space} classes="h-full" />
