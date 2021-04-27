<script lang="ts">
	import Content from '../ui/Content.svelte';
	import WorldName from '../world/WorldName.svelte';
	import type {BlogPostData} from '$lib/data';

	export let post: BlogPostData;
</script>

<Content>
	<h1 class="font-hairline">
		<span class="mr-2">{post.title}</span>
		<WorldName innerClasses="font-hairline" name={post.author} />
	</h1>
	{@html post.content}
</Content>
