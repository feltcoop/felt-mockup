<script lang="ts">
	import EmojisList from './EmojisList.svelte';
	import EmojiInput from './EmojiInput.svelte';
	import {id} from '$lib/data';
	import type {EmojiData, EmojiSize} from '$lib/data';
	import {sizes} from './emoji';
	import {randInt, randItem} from '../utils/random';
	import {useInterval} from '../ui/interval';

	// TODO animate the input emoji into the list

	export let emojis: EmojiData[];
	export let values: string[];
	export let classes = '';
	export let style = '';

	const submit = (text: string, size: EmojiSize): void => {
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
		() => submit(randItem(values)!, randItem(sizes) as EmojiSize),
		() => randInt(150, 1500),
	);

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col {classes}" {style}>
	<EmojiInput {submit} {values} />
	<div
		class="overflow-y-hidden flex items-start flex-1 border-4 border-purple-200
		rounded-bl-lg rounded-tr-lg"
	>
		{#if emojis && emojis.length}
			<EmojisList {emojis} />
		{/if}
	</div>
</div>
