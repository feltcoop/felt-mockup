<script lang="ts">
	import BlogPostListItem from './BlogPostListItem.svelte';

	export let posts;
	export let addComment;
	// $: console.log('blog post list', posts);
</script>

<ul>
	{#each posts as post}
		<BlogPostListItem {post} {addComment} />
	{/each}
</ul>
