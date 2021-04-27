<script lang="ts">
	import BlogPost from './BlogPost.svelte';
	import BlogCommentComposer from './BlogCommentComposer.svelte';
	import ForumReplies from '../forum/ForumReplies.svelte';
	import type {BlogPostData, ForumReplyData} from '$lib/data';

	export let post: BlogPostData;
	export let addComment: (post: BlogPostData, comment: ForumReplyData) => void;
</script>

<li class="my-10">
	<BlogPost {post} />
	{#if post.children}
		<ForumReplies parent={post} />
	{/if}
	<BlogCommentComposer {post} {addComment} />
</li>
