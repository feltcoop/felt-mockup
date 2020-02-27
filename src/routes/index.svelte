<script>
	import Content from '../app/ui/Content.svelte';
	import TextInput from '../app/ui/TextInput.svelte';
	import SocialLinks from '../app/ui/SocialLinks.svelte';
	import MediaListCallout from '../app/ui/MediaListCallout.svelte';
	// import PlaceholderInfo from '../app/ui/PlaceholderInfo.svelte';

	// let text = '';

	// let notes = [{ content: 'im a note :)' }];

	// const submit = (_, e) => {
	// 	e.preventDefault(); // TODO needed?
	// 	e.stopPropagation(); // TODO needed?
	// 	notes = [{ content: text }, ...notes];
	// 	text = '';
	// };
</script>

<svelte:head>
	<title>felt</title>
</svelte:head>
<div class="flex flex-col flex-1 p-2 items-center" style="max-width: 640px;">
	<!-- <div class="flex flex-col" style="width: 240xp;">
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
	</PlaceholderInfo> -->
	<ul class="text-2xl text-center">
		<li class="py-4 font-hairline flex flex-col items-center">
			<div class="text-6xl">felt</div>
			<div>customizable community tools that feel good</div>
		</li>
		<li class="py-4 font-hairline">
			<span class="text-4xl">hi, welcome!</span>
			<div>
				this is a
				<span class="bg-red-300 font-bold">mockup</span>
				not a working website
			</div>
		</li>
		<li class="py-4 mt-8">
			<!-- wrap it so it doesn't fill the space -->
			<Content classes="flex items-center justify-center">
				<a
					href="/about"
					class="logo-heart flex flex-wrap flex-col items-center justify-center">
					<span class="text-4xl mr-2 font-hairline">→ learn about felt ←</span>
					<img
						src="/logo-heart.png"
						alt="fuzzy felt heart"
						style="width: 192px; height: 178px;" />
				</a>
			</Content>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<div>source code at</div>
				<a class="big-link" href="https://github.com/feltcoop/felt">
					github.com/feltcoop/felt
				</a>
			</Content>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<a class="big-link" href="https://felt.social">felt.social</a>
				<div>is our service and business</div>
			</Content>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<a class="big-link" href="https://felt.dev">felt.dev</a>
				<div>is for Felt the free software</div>
			</Content>
		</li>
		<li class="mb-8 text-base">
			<MediaListCallout />
		</li>
		<li class="mb-8">
			<SocialLinks />
		</li>
	</ul>
</div>

<style>
	.big-link {
		@apply font-hairline text-4xl text-green-700;
	}
	.big-link:hover {
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
