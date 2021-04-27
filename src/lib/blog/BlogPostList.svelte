<script lang="ts">
	import type {BlogPostData} from '$lib/data';

	import BlogPostListItem from './BlogPostListItem.svelte';

	export let posts: BlogPostData[];
	export let addComment: ((text: string) => void) | undefined = undefined;
	// $: console.log('blog post list', posts);
</script>

<ul>
	{#each posts as post}
		<BlogPostListItem {post} {addComment} />
	{/each}
</ul>
