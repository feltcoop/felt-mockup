<script>
	export let emoji;
</script>

<div class={'size-' + emoji.size}>{emoji.text}</div>

<style>
	.size-1 {
		font-size: 1em;
	}
	.size-2 {
		font-size: 2em;
	}
	.size-3 {
		font-size: 3em;
	}
</style>
