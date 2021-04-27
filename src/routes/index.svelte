<script lang="ts">
	import Content from '$lib/ui/Content.svelte';
	import SocialLinks from '$lib/ui/SocialLinks.svelte';
	import MediaListCallout from '$lib/ui/MediaListCallout.svelte';
</script>

<svelte:head>
	<title>Felt</title>
</svelte:head>
<div class="flex flex-col flex-1 p-2 items-center" style="max-width: 640px;">
	<ul class="text-2xl text-center">
		<li class="py-4 font-hairline flex flex-col items-center">
			<div class="text-6xl">Felt</div>
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
				<a href="/about" class="logo-heart flex flex-wrap flex-col items-center justify-center">
					<span class="text-4xl mr-2 font-hairline">→ learn about Felt ←</span>
					<img src="/felt.png" alt="fuzzy felt heart" style="width: 192px; height: 178px;" />
				</a>
			</Content>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<div>source code at</div>
				<a class="text-4xl" style="font-weight: 100;" href="https://github.com/feltcoop/felt">
					github.com/feltcoop/felt
				</a>
			</Content>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<a class="text-4xl" style="font-weight: 100;" href="https://felt.social"> Felt.social </a>
				<div>is our service and business</div>
			</Content>
		</li>
		<li class="py-4 mb-8">
			<Content classes="font-hairline mb-4">
				<a class="text-4xl" style="font-weight: 100;" href="https://www.felt.dev"> Felt.dev </a>
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
	.logo-heart img {
		transform: scale3d(1, 1, 1);
		transition: transform 0.06s ease-out;
	}
	.logo-heart:hover {
		text-decoration: underline;
	}
	.logo-heart:hover img {
		transform: scale3d(1.03, 1.03, 1);
	}
	.logo-heart:active img {
		transform: scale3d(1.06, 1.06, 1);
	}
</style>
