<script lang="ts">
	import type {ViewData} from '$lib/data';

	import View from './View.svelte';

	// We're referring to this as a `BoxView` instead of `Box`
	// because for now we are making a clear distinction between
	// components that do and do not support the `View` contract.
	// In the future we could remove all of the `View` suffixes if it made sense.

	export let view: ViewData;
</script>

<div>
	{#if view.children}
		{#each view.children as child}
			<!-- TODO class should probably be provided by the view data, and wrapper element should probably be removed -->
			<div class="mb-10">
				<View view={child} />
			</div>
		{/each}
	{/if}
</div>
