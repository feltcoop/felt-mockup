<script lang="ts">
	import PrimaryNav from '$lib/ui/PrimaryNav.svelte';
	import {provideSession} from '$lib/session/context.js';
	import {provideWorld} from '$lib/world/context.js';
	import {provideSelection} from '$lib/selection/context.js';
	import data from '$lib/data';

	const {worlds, session: initialSessionData} = data;

	// console.log('MAIN LAYOUT', initialSessionData);

	export let segment;

	// $: console.log('segment', segment);

	provideSession(initialSessionData);
	provideSelection(null);

	const world = provideWorld(worlds.find((w) => w.slug === segment) || worlds[0]);
	$: $world = worlds.find((w) => w.slug === segment) || worlds[0];
	// $: console.log('world', $world);
</script>

<PrimaryNav {segment} {worlds} />
<main class="flex h-full w-full">
	<slot />
</main>
