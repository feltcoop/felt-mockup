<script>
	import World from '@app/world/World.svelte';
	import Content from '@app/ui/Content.svelte';
	import { useWorld } from '@app/world/context.js';
	import TextInput from '@app/ui/TextInput.svelte';

	const world = useWorld();

	let text = '';
</script>

<svelte:head>
	<title>felt / {$world.title}</title>
</svelte:head>

<World {world} />

<div class="flex flex-col p-2">
	{#if text}
		<div class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
			<div class="px-2">{text}</div>
		</div>
	{/if}
	<TextInput bind:value={text} />
</div>
