<script>
	import Content from '../app/ui/Content.svelte';
	import TextInput from '../app/ui/TextInput.svelte';
	import SocialLinks from '../app/ui/SocialLinks.svelte';
	import PlaceholderInfo from '../app/ui/PlaceholderInfo.svelte';

	let text = '';

	let notes = [{ content: 'im a note :)' }];

	const submit = (_, e) => {
		e.preventDefault(); // TODO needed?
		e.stopPropagation(); // TODO needed?
		notes = [{ content: text }, ...notes];
		text = '';
	};
</script>

<svelte:head>
	<title>felt</title>
</svelte:head>
<div class="flex flex-col flex-1 p-2 items-center" style="max-width: 640px;">
	<div class="flex flex-col" style="width: 240xp;">
		<TextInput bind:value={text} {submit} />
		{#if text}
			<div
				class="px-2 py-1 border-4 border-purple-200 border-bl-lg rounded-bl-lg
				rounded-tr-lg">
				{text}
			</div>
		{/if}
		<ul>
			{#each notes as note}
				<li>
					{@html note.content}
				</li>
			{/each}
		</ul>
	</div>
	<PlaceholderInfo>
		TODO add global activity, user settings, & other info
	</PlaceholderInfo>
	<ul class="text-2xl text-center">
		<li class="py-4 font-hairline flex flex-col items-center">
			<div class="flex justify-center items-center">
				<div class="flex justify-center items-center text-right">
					<img
						src="/logo-192-textured.png"
						alt="fuzzy felt f"
						style="width: 192px; height: 192px;" />
					<div style="max-width: 256px;">
						<span class="text-4xl">felt</span>
						is free and open community software for empowering people and
						democratic organizations
					</div>
				</div>
			</div>
		</li>
		<li class="py-4 mt-8">
			<!-- wrap it so it doesn't fill the space -->
			<div class="flex items-center justify-center">
				<a
					href="/about"
					class="logo-heart flex flex-wrap items-center justify-center">
					<span class="text-5xl mr-2 font-hairline text-green-700">about</span>
					<img
						src="/logo-heart.png"
						alt="fuzzy felt heart"
						style="width: 192px; height: 178px;" />
				</a>
			</div>
		</li>
		<li class="py-4 font-hairline">
			<span class="text-4xl">
				hi,
				<span class="text-5xl text-gray-600">welcome!</span>
			</span>
			<div>
				this is a
				<span class="bg-red-200">
					<span class="text-4xl">pre-alpha</span>
					preview
				</span>
			</div>
		</li>
		<li class="py-4 font-hairline flex flex-col items-center">
			<div class="font-medium bg-red-400 flex items-center">
				<span class="text-6xl leading-none">→</span>
				expect nothing
				<span class="text-6xl leading-none">←</span>
			</div>
			<div class="font-bold bg-red-600 flex items-center">
				<span class="text-6xl leading-none">⚠</span>
				assume security fails 100%
				<span class="text-6xl leading-none">⚠</span>
			</div>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<div>free source code</div>
				at
				<a class="github-repo" href="https://github.com/feltcoop/felt">
					github.com/feltcoop/felt
				</a>
			</Content>
		</li>
		<li class="mb-8">
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
