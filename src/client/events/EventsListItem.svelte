<script lang="ts">
	import WorldName from '../world/WorldName.svelte';

	export let event;
</script>

<article class="p-2">
	<div class="flex">
		<WorldName name={event.author} classes="mr-2" />
		<div>
			{@html event.title}
		</div>
	</div>
	<div>
		{@html event.content}
	</div>
</article>
