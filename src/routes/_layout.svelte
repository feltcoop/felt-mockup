<script>
	import PrimaryNav from '../client/ui/PrimaryNav.svelte';
	import {provideSession} from '../client/session/context.js';
	import {provideWorld} from '../client/world/context.js';
	import {provideSelection} from '../client/selection/context.js';
	import data from './_data.js';

	const {worlds, session: initialSessionData} = data;

	// console.log('MAIN LAYOUT', initialSessionData);

	export let segment;

	// $: console.log('segment', segment);

	provideSession(initialSessionData);
	provideSelection(null);

	const world = provideWorld(worlds.find(w => w.slug === segment) || worlds[0]);
	$: $world = worlds.find(w => w.slug === segment) || worlds[0];
	// $: console.log('world', $world);
</script>

<PrimaryNav {segment} {worlds} />
<main>
	<slot />
</main>
