<script>
	import SocialLinks from '../client/ui/SocialLinks.svelte';
	import MediaListCallout from '../client/ui/MediaListCallout.svelte';
</script>

<svelte:head>
	<title>Felt</title>
</svelte:head>
<div style="max-width: 640px;">
	<ul>
		<li>
			<div>Felt</div>
			<div>customizable community tools that feel good</div>
		</li>
		<li>
			<a href="/about">
				<span>→ learn about Felt ←</span>
				<img src="/logo-heart.png" alt="fuzzy felt heart" style="width: 192px; height: 178px;" />
			</a>
		</li>
		<li>
			<span>source code at</span>
			<a href="https://github.com/feltcoop/felt">github.com/feltcoop/felt</a>
		</li>
		<li>
			<a href="https://felt.social">Felt.social</a>
			<span>is our service and business</span>
		</li>
		<li>
			<a href="https://felt.dev">Felt.dev</a>
			<span>is for Felt the free software</span>
		</li>
		<li style="position: relative;">
			<MediaListCallout />
		</li>
		<li>
			<SocialLinks />
		</li>
	</ul>
</div>
