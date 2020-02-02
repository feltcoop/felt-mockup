<script>
	import Content from '@app/ui/Content.svelte';
	import TextInput from '@app/ui/TextInput.svelte';

	let text = '';

	let notes = [{ content: 'im a note :)' }];

	const submit = () => {
		notes = [{ content: text }, ...notes];
		text = '';
	};
</script>

<svelte:head>
	<title>felt</title>
</svelte:head>
<div class="flex flex-col flex-1 p-2" style="max-width: 640px;">
	<Content>
		<h1>felt</h1>
	</Content>
	<div class="flex flex-col">
		<TextInput bind:value={text} {submit} classes="mb-2" />
		{#if text}
			<div
				class="px-2 py-1 border-4 border-purple-200 border-bl-lg mb-2
				rounded-bl-lg rounded-tr-lg">
				{text}
			</div>
		{/if}
	</div>
	<ul>
		{#each notes as note}
			<li>
				{@html note.content}
			</li>
		{/each}
	</ul>
</div>
