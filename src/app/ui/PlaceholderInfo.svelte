<script>
	export let classes = '';
	export let interactive = false;
	$: colorClasses = interactive
		? 'bg-purple-100 text-purple-700'
		: 'bg-gray-100 text-gray-700';
</script>

<div class="pl-2 {classes}" class:interactive>
	<span class="{colorClasses} text-lg font-hairline">
		<span class="text-5xl leading-none">{'{'}</span>
		<slot />
		<span class="text-5xl leading-none">{'}'}</span>
	</span>
</div>

<style>
	.interactive:hover {
		@apply text-purple-800;
	}
	.interactive:active {
		@apply text-purple-900;
	}
</style>
