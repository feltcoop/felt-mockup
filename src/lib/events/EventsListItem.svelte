<script lang="ts">
	import type {EventData} from '$lib/data';
	import WorldName from '../world/WorldName.svelte';

	export let event: EventData;
</script>

<article>
	<div class="world">
		<WorldName name={event.author} classes="mr-2" />
		<div>
			{@html event.title}
		</div>
	</div>
	<div>
		{@html event.content}
	</div>
</article>

<style>
	article {
		padding: 0.5rem;
	}
	.world {
		display: flex;
	}
</style>
