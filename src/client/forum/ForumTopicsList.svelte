<script>
	import ForumTopicsListItem from './ForumTopicsListItem.svelte';

	export let topics;
	export let addReply;
	export let selectReply;
	export let selection;
</script>

{#each topics as topic}
	<ForumTopicsListItem {topic} {addReply} {selectReply} {selection} />
{/each}
