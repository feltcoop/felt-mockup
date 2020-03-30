<script>
	import EmojisList from './EmojisList.svelte';
	import EmojisListItem from './EmojisListItem.svelte';
	import EmojiInput from './EmojiInput.svelte';
	import { id } from '../../routes/_data.js';
	import { sizes } from './emoji.js';
	import { randInt, randItem } from '../utils/random.js';
	import { useInterval } from '../ui/interval.js';

	// TODO animate the input emoji into the list

	export let emojis;
	export let values;
	export let classes = '';
	export let style = '';

	const submit = (text, size) => {
		// console.log('submit emoji', text, size);
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

<div class="flex flex-col {classes}" {style}>
	<EmojiInput {submit} {values} />
	<div
		class="overflow-y-hidden flex items-start flex-1 border-4 border-purple-200
		rounded-bl-lg rounded-tr-lg">
		{#if emojis && emojis.length}
			<EmojisList {emojis} />
		{/if}
	</div>
</div>
