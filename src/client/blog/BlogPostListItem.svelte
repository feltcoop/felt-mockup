<script>
	import BlogPost from './BlogPost.svelte';
	import BlogCommentComposer from './BlogCommentComposer.svelte';
	import ForumReplies from '../forum/ForumReplies.svelte';

	export let post;
	export let addComment;
</script>

<li>
	<BlogPost {post} />
	{#if post.children}
		<ForumReplies parent={post} />
	{/if}
	<BlogCommentComposer {post} {addComment} />
</li>
