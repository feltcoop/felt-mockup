<script>
	import WorldName from '../world/WorldName.svelte';

	export let activity;
</script>

<div>
	<WorldName name={activity.author} />
	{@html activity.content}
</div>
