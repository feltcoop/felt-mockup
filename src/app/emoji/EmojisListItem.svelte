<script>
	import WorldName from '../world/WorldName.svelte';
	import { sizeClasses } from './emoji.js';

	export let emoji;

	$: sizeClass = sizeClasses[emoji.size];
</script>

<div class={sizeClass}>{emoji.text}</div>
