<script>
	import Content from '../client/ui/Content.svelte';
	import SocialLinks from '../client/ui/SocialLinks.svelte';

	let el;
</script>

<svelte:head>
	<title>about felt</title>
</svelte:head>

<div bind:this={el}>
	<Content>
		<div>
			<img style="width: 192px; height: 178px;" src="logo-heart.png" alt="fuzzy felt heart" />
			<span>about</span>
			<img style="width: 192px; height: 192px;" src="logo-192-textured.png" alt="fuzzy felt logo" />
		</div>
		<p>
			Felt is a set of tools for building customizable self-governing communities. It seeks to
			empower us, help us organize, and improve our communication. It's a free and open source
			alternative to many websites and apps tucked into a warm fuzzy package.
		</p>
		<p>
			Our team is small and our goals are over the top. Through the might of software we aim to help
			people solve priority problems with <a href="felt/memes">joy</a> . Felt is what the web should
			be.
		</p>
		Felt features (one day):
		<ul>
			<li>customizable tools for online and offline communities</li>
			<li>chats and forums</li>
			<li>malleable media that we design and share</li>
			<li>advanced moderation and shared governance</li>
			<li>polls and fun interactives</li>
			<li>events and rsvps</li>
			<li>note taking and sharing</li>
			<li>tasks and todos and reminders</li>
			<li>bookmarks and aggregation and adventure</li>
			<li>p2p video, audio, messaging, etc</li>
			<li>blogs and web publishing</li>
			<li>commerce</li>
			<li>maybe one day, galaxies of interesting communities to explore</li>
			<li>client software that users fully control</li>
			<li>client software that works with many service providers in a single app</li>
			<li>server software that's easy to self-host</li>
			<li>and more! much more</li>
		</ul>
		<p>
			And Felt is more than a big bag of features. It's a customizable <a
				href="https://github.com/feltcoop/felt"
			>open source software platform</a> , a <a href="https://felt.social">community and business</a>
			, a <a href="https://twitter.com/feltcoop">co-op of worker-owners</a> , and hopefully one day a
			<a href="https://platform.coop/">platform co-op</a> (communities owning themselves? absurd) — all
			with a purpose that puts people first. If we do it right, Felt is tech that feels good.
		</p>
		<p>
			Felt The Business makes money (or will!) by selling value to users. Mostly this is through
			subscription services and commerce mediation like <a
				href="https://felt.social"
			>Felt.social</a> . We want a business model that keeps our incentives aligned with our users, so
			we accept no revenue from third parties like advertisers. You're a person so we will treat you
			like one. We hope to provide an amazing customer experience, but you can always export your data
			from our service to another.
		</p>
		<p>
			The company behind Felt is a democratic worker co-op where us workers share equal ownership
			and control. We believe this model will help Felt The Business remain accountable to its
			users, workers, and society. In the future, we want to explore the <a
				href="https://platform.coop/"
			>platform cooperative model</a> to share control and ownership with our users. (you, we hope!)
		</p>
		Some links:
		<ul>
			<li>
				<a href="https://github.com/feltcoop/felt">Felt source code on GitHub</a> live on the web at
				<a href="https://felt.dev">Felt.dev</a>
			</li>
			<li>
				community at <a href="https://felt.social">Felt.social</a> and its <a href="https://github.com/feltcoop/felt.social">source
					code on GitHub</a>
			</li>
			<li><a href="https://twitter.com/feltcoop">twitter.com/feltcoop</a></li>
		</ul>
		<p>
			Felt is free and open source software released under the permissive MIT license, and it's
			designed to be <a href="https://github.com/feltcoop/felt/tree/master/src/project/deploy">
				easily self-hosted
			</a>, so you can run a private instance for your communities and maintain full control.
		</p>
		<p>Your feedback is 💚💚</p>
		<SocialLinks />
	</Content>
</div>
