<script>
	import WorldName from '../world/WorldName.svelte';

	export let event;
</script>

<article>
	<div>
		<WorldName name={event.author} />
		<div>
			{@html event.title}
		</div>
	</div>
	<div>
		{@html event.content}
	</div>
</article>
