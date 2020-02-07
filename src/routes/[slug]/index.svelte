<script>
	import World from '../../app/world/World.svelte';
	import Content from '../../app/ui/Content.svelte';
	import { useWorld } from '../../app/world/context.js';
	import TextInput from '../../app/ui/TextInput.svelte';

	const world = useWorld();

	let text = '';

	const defaultNotes = () => [
		{ content: 'im a note :D' },
		{ content: 'same lol' },
	];
	let notes = defaultNotes();

	$: $world, (notes = defaultNotes()); // TODO this is a hack to make things less confusing - the fix is to persist state per world

	const submit = () => {
		notes = [...notes, { content: text }];
		text = '';
	};
</script>

<svelte:head>
	<title>felt / {$world.title}</title>
</svelte:head>

<World {world} />

<div class="flex flex-col p-2">
	<ul>
		{#each notes as note}
			<li>
				{@html note.content}
			</li>
		{/each}
		{#if text}
			<li class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
				<div class="px-2">
					{@html text}
				</div>
			</li>
		{/if}
	</ul>
	<TextInput bind:value={text} {submit} />
</div>
