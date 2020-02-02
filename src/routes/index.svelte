<script>
	import Content from '@app/ui/Content.svelte';
	import TextInput from '@app/ui/TextInput.svelte';
	import SocialLinks from '@app/ui/SocialLinks.svelte';

	let text = '';

	let notes = [
		{ content: 'im a note :)' },
		{
			content: `
				<span class="text-4xl font-hairline">
					hi, <span class="text-6xl text-gray-600">welcome!</span>
					ty for stopping by
				</span>
			`,
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
	<ul class="text-2xl">
		<li class="font-hairline">
			<div>
				this is a
				<span class="font-medium bg-red-200">pre-alpha preview version</span>
				of felt
			</div>
			<div>
				<span class="font-bold bg-red-400">
					<span class="font-medium">expect nothing!</span>
					~~assume security fails 100%~~
				</span>
			</div>
		</li>
		<li>
			<!-- wrap it so it doesn't fill the space -->
			<div class="flex items-center justify-center">
				<a
					href="/about"
					class="logo-heart flex flex-wrap items-top justify-center mt-8">
					<span class="text-6xl mr-2 pb-2 font-hairline text-green-700">
						about
					</span>
					<img
						src="/logo-heart.png"
						alt="fuzzy felt heart"
						style="width: 192px; height: 178px; margin-top: -18px" />
				</a>
			</div>
		</li>
		<li class="mb-8">
			<Content classes="font-hairline text-center mb-4">
				<div>
					<a
						href="https://en.wikipedia.org/wiki/Free_software"
						target="_blank"
						rel="noopener"
						class="exclaim">
						!!
					</a>
					free
					<a
						href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
						target="_blank"
						rel="noopener"
						class="exclaim">
						!!
					</a>
					source code
				</div>
				at
				<a
					class="github-repo"
					href="https://github.com/feltcoop/felt"
					target="_blank"
					rel="noopener">
					github.com/feltcoop/felt
				</a>
			</Content>
		</li>
		<li>
			<SocialLinks />
		</li>
	</ul>
</div>

<style>
	.github-repo {
		@apply font-normal;
	}
	.exclaim {
		@apply text-6xl font-hairline text-gray-600;
	}
	.logo-heart img {
		transform: scale3d(1, 1, 1);
		transition: transform 0.13s ease-out;
	}
	.logo-heart:hover {
		text-decoration: underline;
	}
	.logo-heart:hover img {
		transform: scale3d(1.03, 1.03, 1);
	}
	.logo-heart:active img {
		transform: scale3d(0.96, 0.96, 1);
	}
</style>
