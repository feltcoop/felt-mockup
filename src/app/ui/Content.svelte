<script>
	export let classes = '';
</script>

<div class="content {classes}">
	<slot />
</div>

<style lang="postcss">
	.content {
		@apply mb-2;
		max-width: 640px; /* TODO variable */
	}
	.content :global(a) {
		@apply text-green-700;
		font-weight: bold;
	}
	.content :global(a:hover) {
		text-decoration: underline;
	}

	.content :global(h1) {
		@apply text-2xl;
		@apply mb-4;
	}
	.content :global(h2) {
		@apply text-lg;
		@apply mb-4;
	}

	.content :global(ul) {
		@apply p-4 list-disc;
	}
	.content :global(ol) {
		@apply p-4 list-decimal;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.content :global(p) {
		@apply mb-4;
	}
</style>
