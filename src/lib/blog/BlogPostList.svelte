<script lang="ts">
	import type {BlogPostData, ForumReplyData} from '$lib/data';
	import BlogPostListItem from './BlogPostListItem.svelte';

	export let posts: BlogPostData[];
	export let addComment: (post: BlogPostData, comment: ForumReplyData) => void;
	// $: console.log('blog post list', posts);
</script>

<ul>
	{#each posts as post}
		<BlogPostListItem {post} {addComment} />
	{/each}
</ul>
