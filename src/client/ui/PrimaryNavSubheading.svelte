<script>
	export let isActive;
	export let classes = '';
	$: activeClasses = isActive
		? 'text-purple-700 border-purple-200 bg-purple-100'
		: 'text-gray-500 border-gray-200';
</script>

<div
	class="subheading relative text-sm pl-4 mt-4 border-dashed rounded-bl-lg
	rounded-tr-lg border-l-4 border-r-2 border-t-2 border-b-4 {classes}
	{activeClasses}"
	class:selected={isActive}
	on:click>
	<slot />
</div>

<style>
	.subheading {
		cursor: default;
	}
	.subheading:active {
		top: 2px;
		/* @apply border-green-300; */
	}
	.subheading.selected:active {
		/* @apply border-purple-300; */
		top: -2px;
	}
</style>
