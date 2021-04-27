<script lang="ts">
	import World from '$lib/world/World.svelte';
	import {useWorld} from '$lib/world/context';
	import TextInput from '$lib/ui/TextInput.svelte';

	const world = useWorld();

	let text = '';

	const defaultNotes = () => [{content: 'im a note :D'}, {content: 'same lol'}];
	let notes = defaultNotes();

	$: $world, (notes = defaultNotes()); // TODO this is a hack to make things less confusing - the fix is to persist state per world

	const submit = (_: any, e: KeyboardEvent) => {
		e.preventDefault(); // TODO needed?
		e.stopPropagation(); // TODO needed?
		notes = [...notes, {content: text}];
		text = '';
	};
</script>

<svelte:head>
	<title>felt / {$world.title}</title>
</svelte:head>

<World {world} />

<!-- TODO this is only here to satisfy the "input box on every page" constraint -->
<div class="flex flex-col p-2" style="max-width: 640px;">
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
