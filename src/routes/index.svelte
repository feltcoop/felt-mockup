<script>
	import Content from '@app/ui/Content.svelte';
	import TextInput from '@app/ui/TextInput.svelte';
	import SocialLinks from '@app/ui/SocialLinks.svelte';

	let text = '';

	let notes = [
		{ content: 'im a note :)' },
		{
			content:
				'<span class="text-4xl font-hairline">hi, <span class="text-6xl"><span class="text-purple-700">w</span><span class="text-green-700">e</span><span class="text-purple-700">l</span><span class="text-green-700">c</span><span class="text-purple-700">o</span><span class="text-green-700">m</span><span class="text-purple-700">e</span><span class="text-green-700">!</span><span class="text-purple-700">!</span></span> ty for stoppin by</span>',
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
			<li class="font-hairline">
				this is a
				<span class="font-medium underline">pre-alpha preview version</span>
				of the software.
				<span class="font-bold underline">expect nothing!</span>
			</li>
			<li>
				<a href="/about" class="flex">
					<span class="text-6xl mr-4 font-hairline">about</span>
					<img
						src="/logo-heart.png"
						alt="fuzzy felt heart"
						style="width: 192px; height: 178px;" />
				</a>
			</li>
			<li>
				<span class="font-hairline">
					<a
						href="https://en.wikipedia.org/wiki/Free_software"
						target="_blank"
						rel="noopener"
						class="text-4xl font-hairline">
						!!
					</a>
					free
					<a
						href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
						target="_blank"
						rel="noopener"
						class="text-4xl font-hairline">
						!!
					</a>
					source code at
				</span>
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
