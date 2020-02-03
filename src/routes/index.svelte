<script>
	import Content from '@app/ui/Content.svelte';
	import TextInput from '@app/ui/TextInput.svelte';
	import SocialLinks from '@app/ui/SocialLinks.svelte';

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
		<TextInput bind:value={text} {submit} />
		{#if text}
			<div
				class="px-2 py-1 border-4 border-purple-200 border-bl-lg rounded-bl-lg
				rounded-tr-lg">
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
	<ul class="text-2xl text-center">

		<li class="py-4">
			<span class="text-4xl font-hairline">
				hi,
				<span class="text-5xl text-gray-600">welcome!</span>
				ty for stopping by
			</span>
		</li>
		<li class="py-4 font-hairline flex flex-col items-center">
			<div>
				this is a
				<span class="bg-red-200">
					<span class="text-4xl">pre-alpha</span>
					preview version
				</span>
			</div>
			<div>
				of
				<a
					class="github-repo"
					href="https://github.com/feltcoop/felt"
					target="_blank"
					rel="noopener">
					felt
				</a>
			</div>
			<div class="font-medium bg-red-400">{'→'}expect nothing{'←'}</div>
			<div class="font-bold bg-red-600">⚠ assume security fails 100% ⚠</div>
		</li>
		<li class="py-4">
			<!-- wrap it so it doesn't fill the space -->
			<div class="flex items-center justify-center">
				<a
					href="/about"
					class="logo-heart flex flex-wrap items-center justify-center mt-8">
					<span class="text-5xl mr-2 pb-2 font-hairline text-green-700">
						learn about
					</span>
					<img
						src="/logo-heart.png"
						alt="fuzzy felt heart"
						style="width: 192px; height: 178px;" />
				</a>
			</div>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<div>
					<a
						href="https://en.wikipedia.org/wiki/Free_software"
						target="_blank"
						rel="noopener"
						class="exclaim">
						!!
					</a>
					free source code
					<a
						href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
						target="_blank"
						rel="noopener"
						class="exclaim">
						!!
					</a>
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
		@apply font-hairline text-5xl text-green-700;
	}
	.github-repo:hover {
		@apply underline;
	}
	.exclaim {
		@apply text-5xl font-hairline text-gray-600;
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
