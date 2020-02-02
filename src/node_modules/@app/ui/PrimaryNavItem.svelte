<script>
	export let isSelected;
	export let href;
</script>

<li>
	<a class:selected={isSelected} rel="prefetch" {href}>
		<slot />
	</a>
</li>

<style lang="postcss">
	li {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	a {
		display: flex;
		align-items: center;
		padding: 4px 8px;
		color: inherit;
		width: 100%;
		height: 100%;
		@apply border-dashed rounded-bl-lg rounded-tr-lg border-l-4 border-r-4 border-t-2 border-b-2 border-transparent;
		position: relative;
	}
	a:hover {
		text-decoration: underline;
		@apply border-green-200 bg-green-100;
	}
	a.selected {
		@apply text-purple-700 border-purple-200 bg-purple-100;
		cursor: default;
	}
	a:active {
		top: 1px;
		@apply border-green-300;
	}
	a.selected:active {
		@apply border-purple-300;
		top: -1px;
	}
</style>
