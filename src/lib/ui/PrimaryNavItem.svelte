<script lang="ts">
	export let selected: boolean;
	export let href: string;
</script>

<li>
	<a class:selected {href}>
		<slot />
	</a>
</li>

<style>
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
		border-style: dashed;
		border-bottom-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		border-left-width: 4px;
		border-right-width: 2px;
		border-top-width: 2px;
		border-bottom-width: 4px;
		border-color: transparent;
		position: relative;
	}
	a:hover {
		text-decoration: underline;
		border-color: #c6f6d5;
		background-color: #f0fff4;
	}
	a.selected {
		color: #6b46c1;
		border-color: #e9d8fd;
		background-color: #faf5ff;
		cursor: default;
	}
	a:active {
		top: 2px;
		border-color: #9ae6b4;
	}
	a.selected:active {
		border-color: #d6bcfa;
		top: -2px;
	}
</style>
