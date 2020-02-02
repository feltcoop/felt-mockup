<script>
	import Content from '@app/ui/Content.svelte';
	import TextInput from '@app/ui/TextInput.svelte';
	import SocialLinks from '@app/ui/SocialLinks.svelte';

	let text = '';

	let notes = [
		{ content: 'im a note :)' },
		{
			content:
				'hi, <span class="font-bold"><span class="text-purple-700">w</span><span class="text-green-700">e</span><span class="text-purple-700">l</span><span class="text-green-700">c</span><span class="text-purple-700">o</span><span class="text-green-700">m</span><span class="text-purple-700">e</span><span class="text-green-700">!</span><span class="text-purple-700">!</span></span> ty for stoppin by',
		},
	];

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
	<Content>
		<ol class="text-2xl" style="padding-left: 36px;">
			<li>
				<a href="/about" class="flex">
					<span class="text-4xl mr-4">about</span>
					<img src="/logo-heart.png" alt="fuzzy felt heart" />
				</a>
			</li>
			<li>
				free
				<small>!!!</small>
				source code at
				<a
					href="https://github.com/feltcoop/felt"
					target="_blank"
					rel="noopener">
					github.com/feltcoop/felt
				</a>
			</li>
			<li>
				<SocialLinks />
			</li>
		</ol>
	</Content>
</div>
