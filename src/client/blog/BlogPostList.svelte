<script>
	import BlogPostListItem from './BlogPostListItem.svelte';

	export let posts;
	export let addComment;
</script>

<ul>
	{#each posts as post}
		<BlogPostListItem {post} {addComment} />
	{/each}
</ul>
