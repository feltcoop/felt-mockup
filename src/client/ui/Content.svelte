<div class="content">
	<slot />
</div>

<style>
	.content {
		max-width: 640px;
	}

	.content :global(a) {
		color: green;
		font-weight: bold;
	}
	.content :global(a:hover) {
		color: purple;
		text-decoration: underline;
	}
	/* TODO different outline colors based on if it's an external or internal link */
	.content :global(a:focus) {
		color: green;
		outline: 3px dotted #b794f4;
	}

	.content :global(h1) {
		font-size: 4em;
	}
	.content :global(h2) {
		font-size: 3em;
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
		list-style: disc;
		line-height: 1.5;
	}

	.content :global(ol) {
		list-style: decimal;
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>
