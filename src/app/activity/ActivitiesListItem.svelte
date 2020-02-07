<script>
	import WorldName from '../world/WorldName.svelte';

	export let activity;
</script>

<div>
	<WorldName name={activity.author} classes="mr-2" />
	{@html activity.content}
</div>
