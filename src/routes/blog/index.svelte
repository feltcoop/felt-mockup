<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`)
			.then(r => r.json())
			.then(posts => {
				return { posts };
			});
	}
</script>

<script>
	import Content from '../../app/ui/Content.svelte';
	import Blog from '../../app/blog/Blog.svelte';

	export let posts;
</script>

<svelte:head>
	<title>felt / blog</title>
</svelte:head>

<!--
	TODO replace this and other `max-width: 640px` stuff
	with a <Container/> or <Cell /> or <Box /> or something
-->
<div class="flex-1 p-2" style="max-width: 640px;">
	<Blog {posts} />
</div>
