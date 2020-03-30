<script>
	import PrimaryNav from '../client/ui/PrimaryNav.svelte';
	import { provideSession } from '../client/session/context.js';
	import { provideWorld } from '../client/world/context.js';
	import { provideSpace } from '../client/space/context.js';
	import { provideSelection } from '../client/selection/context.js';
	import { DEFAULT_WORLD } from '../client/world/constants.js';
	import data from './_data.js';

	const { worlds, session: initialSessionData } = data;

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
<main class="flex h-full w-full">
	<slot />
</main>

<style lang="postcss">
	:global(hr) {
		@apply border-dashed border-t-2 border-purple-200;
	}
	:global(textarea) {
		@apply px-2 py-1 rounded-bl-lg rounded-tr-lg;
	}
	:global(img) {
		/* do not show alt text by default */
		color: transparent;
	}
	:global(a) {
		/* TODO doing this because of underlining */
		@apply text-green-700;
	}
</style>
