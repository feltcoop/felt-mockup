<script>
	import Content from '../app/ui/Content.svelte';
	import SocialLinks from '../app/ui/SocialLinks.svelte';
	import MediaListCallout from '../app/ui/MediaListCallout.svelte';

	let el;
</script>

<svelte:head>
	<title>about felt</title>
</svelte:head>

<div class="p-2" bind:this={el}>

	<Content>
		<div class="flex items-center flex-wrap justify-center">
			<img
				style="width: 192px; height: 192px;"
				src="logo-192-textured.png"
				alt="fuzzy felt logo" />
			<span class="p-4 flex-1 text-center text-5xl font-hairline">about</span>
			<img
				style="width: 192px; height: 178px;"
				src="logo-heart.png"
				alt="fuzzy felt heart" />
		</div>
		<p>
			Felt is community software for empowering people and democratic
			organizations. It's a free and open alternative to many websites and apps
			tucked into a warm fuzzy package. Felt's features (will one day) include
			chats, forums, events and rsvps, note taking and sharing, polls, tasks and
			todos and reminders, collaborating with others, shared governance, blogs
			and web publishing, and more, and more! You read that right! And Felt is
			more than a big bag of features. It's a customizable
			<a href="https://github.com/feltcoop/felt">
				open-source software platform
			</a>,
			<a href="https://felt.social">a community</a>
			, and a co-op of worker-owners -
			<a href="https://twitter.com/feltcoop">twitter.com/feltcoop</a>
			&
			<a href="https://github.com/feltcoop">github.com/feltcoop</a>
			& email
			<a href="mailto:team@felt.social">team@felt.social</a>
			- all with a purpose that puts people first. If we do it right, Felt is
			tech that feels good.
		</p>
		<p>
			Our goals are lofty and our team is small, and with the might of software
			we aim to help people solve priority problems and promote
			<a href="felt/memes">much joy</a>.
		</p>
		<p>
			But Felt is not ready yet.
			<span class="font-bold">
				This is just a
				<span class="text-2xl">pre-alpha</span>
				release for demonstration and design purposes.
				<span class="text-2xl">
					Do
					<span class="border-gray-700 border-b-8 border-double">not</span>
					expect security when you run this software (<span class="italic">yet</span>).
				</span>
				Assume everything is broken or fake.
			</span>
		</p>
		Some links:
		<ul>
			<li>
				<a href="https://github.com/feltcoop/felt">
					felt source code on github
				</a>
				live on the web at
				<a href="https://felt.dev">felt.dev</a>
			</li>
			<li>
				<a href="https://felt.social">community at felt.social</a>
				and its
				<a href="https://github.com/feltcoop/felt.social">
					source code on github
				</a>
			</li>
			<li>
				<a href="https://twitter.com/feltcoop">twitter.com/feltcoop</a>
				and email
				<a href="mailto:team@felt.social">team@felt.social</a>
			</li>
		</ul>
		<p>
			Felt is
			<a href="https://en.wikipedia.org/wiki/Free_and_open-source_software">
				free and open-source software
			</a>
			released under the permissive
			<a href="https://github.com/feltcoop/felt/blob/master/license">
				ISC license
			</a>
			(<a href="https://en.wikipedia.org/wiki/ISC_license">see Wikipedia</a>), and it's designed to be
			<a href="https://github.com/feltcoop/felt/tree/master/src/deploy">
				easily self-hosted
			</a>, so you can run a private instance for your communities and maintain full
			control.
		</p>
		<p>
			Felt The Business makes money by selling value to users. Mostly, this is
			through subscription services like
			<a href="https://felt.social">felt.social</a>. We want a business model that keeps our incentives aligned with our
			users, so we accept no revenue from third parties like advertisers. You're
			probably a person so we should treat you like one. We hope to provide an
			amazing customer experience, but you can always export your data from our
			service to another.
		</p>
		<p>
			The company behind Felt is a democratic worker co-op where we workers
			share equal ownership and control. We believe this will help
			<span class="font-bold italic">Felt The Business</span>
			remain
			<span class="font-bold">~accountable~</span>
			to its users and society. To learn more about why we chose this business
			structure, see our (forthcoming) blog post "Why Felt is a worker co-op".
			In the future, we want to explore hybrid models to give users (you!?)
			significant ownership and control and accountability.
		</p>
		<p>Your feedback is 💚💚</p>
		<!-- TODO email input -->
		<hr class="pb-4" />
		<SocialLinks />
		<div class="mt-4">
			<MediaListCallout />
		</div>
	</Content>

</div>
