<script lang="ts">
	export let classes = '';
	export let style = '';
</script>

<div class="content {classes}" {style}>
	<slot />
</div>

<style>
	.content {
		margin-bottom: 0.5rem;
		max-width: 640px; /* TODO variable */
	}
	.content :global(a) {
		color: #2f855a;
		font-weight: bold;
	}
	.content :global(a:hover) {
		color: #6b46c1;
		text-decoration: underline;
	}
	/* TODO different outline colors based on if it's an external or internal link */
	.content :global(a:focus) {
		color: #2f855a;
		outline: 3px dotted #b794f4;
	}
	.content :global(h1) {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.content :global(h2) {
		font-size: 1.125rem;
		margin-bottom: 1rem;
	}

	.content :global(ul) {
		padding: 1rem;
		list-style: disc;
	}
	.content :global(ol) {
		padding: 1rem;
		list-style: decimal;
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
		margin-bottom: 1rem;
	}

	.content :global(.spaced-bottom) {
		margin-bottom: 1rem;
	}
</style>
