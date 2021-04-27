<script lang="ts">
	export let selected: boolean;
	export let classes = '';
</script>

<div class="subheading {classes}" class:selected on:click>
	<slot />
</div>

<style>
	.subheading {
		cursor: default;
		position: relative;
		font-size: 0.875rem;
		padding-left: 1rem;
		margin-top: 1rem;
		border-style: dashed;
		border-bottom-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		border-left-width: 4px;
		border-right-width: 2px;
		border-top-width: 2px;
		border-bottom-width: 4px;
	}
	.subheading:active {
		top: 2px;
		border-color: #9ae6b4;
	}
	.subheading.selected:active {
		border-color: #d6bcfa;
		top: -2px;
	}
	.subheading {
		color: #a0aec0;
		border-color: #edf2f7;
	}
	.selected {
		color: #6b46c1;
		border-color: #e9d8fd;
		background-color: #faf5ff;
	}
</style>
