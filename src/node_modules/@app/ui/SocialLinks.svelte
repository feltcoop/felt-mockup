<script>
	import TwitterLogo from './TwitterLogo.svelte';
	import GithubLogo from './GithubLogo.svelte';
</script>

<div class="flex items-center justify-center">
	<a href="https://twitter.com/feltcoop">
		<TwitterLogo />
	</a>
	<a href="https://github.com/feltcoop">
		<GithubLogo />
	</a>
</div>

<style lang="postcss">
	a {
		text-decoration: none;
		margin: 0 5px;
		outline: none; /* this is bad for accessibility, fix later */
	}
	a :global(svg) {
		transform: scale3d(1, 1, 1);
		transition: transform 0.16s ease-in-out;
	}
	a:hover :global(svg) {
		transform: scale3d(1.1, 1.1, 1);
	}
	a:active :global(svg) {
		transform: scale3d(0.9, 0.9, 1);
	}
</style>
