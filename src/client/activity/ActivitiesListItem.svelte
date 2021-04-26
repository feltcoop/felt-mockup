<script lang="ts">
	import WorldName from '../world/WorldName.svelte';

	export let activity;
</script>

<div class="px-2 py-1">
	<WorldName name={activity.author} classes="mr-2" />
	{@html activity.content}
</div>
