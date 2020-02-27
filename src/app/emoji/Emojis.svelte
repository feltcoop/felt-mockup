<script>
	import EmojisList from './EmojisList.svelte';
	import EmojisListItem from './EmojisListItem.svelte';
	import EmojiInput from './EmojiInput.svelte';
	import { id } from '../../routes/_data.js';

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
			...emojis,
		];
	};

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col {classes}" {style}>
	<EmojiInput {submit} {values} />
	<div
		class="overflow-y-scroll flex items-start flex-1 border-4 border-purple-200
		rounded-bl-lg rounded-tr-lg">
		{#if emojis && emojis.length}
			<EmojisList {emojis} />
		{/if}
	</div>
</div>
