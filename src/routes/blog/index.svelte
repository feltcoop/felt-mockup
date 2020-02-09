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
	<div style="width: 300px;">
		<div
			class="bg-pink-200 text-pink-700 border-pink-300 border-dashed mb-1
			rounded-lg border-4 text-xl pl-1 whitespace-no-wrap"
			style="height: 32px; width: 90px">
			:D subscribe 18%
		</div>
		<div
			class="bg-indigo-200 text-indigo-700 border-indigo-300 border-dashed mb-1
			rounded-lg border-4 text-xl pl-1 whitespace-no-wrap"
			style="height: 32px; width: 250px">
			:) like 49%
		</div>
		<div
			class="bg-yellow-200 text-yellow-700 border-yellow-300 border-dashed mb-1
			rounded-lg border-4 text-xl pl-1 whitespace-no-wrap"
			style="height: 32px; width: 170px">
			:| meh 33%
		</div>
	</div>
</div>
