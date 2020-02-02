<script>
	import Content from '@app/ui/Content.svelte';
	import SocialLinks from '@app/ui/SocialLinks.svelte';
	import MediaListCallout from '@app/ui/MediaListCallout.svelte';

	let el;
</script>

<svelte:head>
	<title>about felt</title>
</svelte:head>

<div class="p-2" bind:this={el}>

	<Content>
		<div class="flex items-center flex-wrap justify-center">
			<img
				style="width: 192px; height: 178px;"
				src="logo-heart.png"
				alt="fuzzy felt heart" />
			<h1 class="p-4 flex-1 text-center">about felt</h1>
			<img
				style="width: 192px; height: 192px;"
				src="logo-192-textured.png"
				alt="fuzzy felt logo" />
		</div>
		<p>
			Felt is community software for empowering people and democratic
			organizations. It's a free and open alternative to many websites and apps
			tucked into one sweet package. Felt's features (will) include chats,
			forums, events and rsvps, polls, note taking and sharing, tasks and todos
			and reminders, collaborating with others, blogs and web publishing, and
			more, and more! And Felt is even more than a big bag of features. It's
			<a href="https://felt.social">a community</a>
			,
			<a href="https://github.com/feltcoop/felt">an open-source platform</a>
			, and
			<a href="mailto:team@felt.social">
				a co-op of workers (team@felt.social)
			</a>
			, all with a purpose that puts people first. If we do it right, Felt
			should be tech that feels good.
		</p>
		<p>
			But Felt is not ready yet.
			<span class="font-bold">
				This is just a pre-alpha release for demonstration and design purposes.
				Do not expect security when you use it (yet).
			</span>
			Our goals are lofty and our team is small, but we hope to provide software
			that solves priority problems and causes
			<a href="felt/memes">much joy</a>
			.
		</p>
		<p>
			Felt is
			<a href="https://en.wikipedia.org/wiki/Free_and_open-source_software">
				free and open-source software
			</a>
			released under the
			<a href="https://github.com/feltcoop/website/blob/master/license">MIT</a>
			license, and it's designed to be easily self-hosted, so you can run a
			private instance for your community and maintain full control. To learn
			more, see
			<a href="https://github.com/feltcoop/felt">our GitHub repo</a>
			and check out the documentation at
			<a href="https://felt.dev">felt.dev</a>
			.
		</p>
		<p>
			The company behind Felt is a democratic worker co-op where the workers
			equally share ownership and control. We believe this is a good way forward
			to help
			<span class="font-bold italic">Felt The Business</span>
			remain
			<span class="font-bold">accountable</span>
			to its users and society. To learn more about why we chose this business
			structure, see our blog post "Why Felt is a worker co-op
			<span class="font-bold text-xl">(TODO)</span>
			" . In the future, we want to explore hybrid models that give users
			(you-sers) significant ownership and control.
		</p>
		<!-- TODO email input -->
		<hr class="pb-4" />
		<SocialLinks />
		<div class="mt-4">
			<MediaListCallout />
		</div>
	</Content>

</div>
