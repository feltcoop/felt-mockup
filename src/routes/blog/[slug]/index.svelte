<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import Content from '../../../app/ui/Content.svelte';
	import BlogPost from '../../../app/blog/BlogPost.svelte';
	import BlogFooter from '../../../app/blog/BlogFooter.svelte';

	// export let segment;
	// console.log('blog slug segment', segment);
	export let post;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<BlogPost {post} />
<BlogFooter />
