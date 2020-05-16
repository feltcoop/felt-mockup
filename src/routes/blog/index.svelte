<script context="module">
	export function preload({params, query}) {
		return this.fetch(`blog.json`)
			.then(r => r.json())
			.then(posts => {
				return {posts};
			});
	}
</script>

<script>
	import Blog from '../../client/blog/Blog.svelte';

	export let posts;
</script>

<svelte:head>
	<title>felt / blog</title>
</svelte:head>

<div style="max-width: 640px;">
	<Blog {posts} />
</div>
