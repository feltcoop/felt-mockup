<script lang="ts">
	import TwitterLogo from './TwitterLogo.svelte';
	import GithubLogo from './GithubLogo.svelte';
</script>

<div class="flex items-center justify-center">
	<a href="https://twitter.com/feltcoop">
		<TwitterLogo classes="clickable" />
	</a>
	<a href="https://github.com/feltcoop">
		<GithubLogo classes="clickable" />
	</a>
</div>

<style lang="postcss">
	a {
		text-decoration: none;
		margin: 0 5px;
		outline: none; /* this is bad for accessibility, fix later */
	}
</style>
