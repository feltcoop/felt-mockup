<script>
	import EmojisList from './EmojisList.svelte';
	import EmojiInput from './EmojiInput.svelte';
	import {id} from '../../routes/_data.js';
	import {sizes} from './emoji.js';
	import {randInt, randItem} from '../utils/random.js';
	import {useInterval} from '../ui/interval.js';

	// TODO animate the input emoji into the list

	export let emojis;
	export let values;

	const submit = (text, size) => {
		emojis = [
			{
				type: 'emoji',
				id: id(),
				text,
				size,
			},
			...emojis.slice(0, 100),
		];
	};

	// we're not alone!
	useInterval(
		() => submit(randItem(values), randItem(sizes)),
		() => randInt(150, 1500),
	);

	// TODO need a store per chat that saves the input state
</script>

<EmojiInput {submit} {values} />
{#if emojis && emojis.length}
	<EmojisList {emojis} />
{/if}
