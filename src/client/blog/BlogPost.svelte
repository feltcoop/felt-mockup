<script>
	import Content from '../ui/Content.svelte';
	import WorldName from '../world/WorldName.svelte';

	export let post;
</script>

<Content>
	<h2>
		<a href={`blog/${post.slug}`}>{post.title}</a>
		<WorldName name={post.author} />
	</h2>
	{@html post.content}
</Content>
