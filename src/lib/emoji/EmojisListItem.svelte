<script lang="ts">
	import WorldName from '../world/WorldName.svelte';
	import {sizeClasses} from './emoji';

	export let emoji;

	$: sizeClass = sizeClasses[emoji.size];
</script>

<div class={sizeClass}>{emoji.text}</div>
