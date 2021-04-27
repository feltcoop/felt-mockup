<script lang="ts">
	import type {EmojiData} from '$lib/data';
	import {sizeClasses} from './emoji';

	export let emoji: EmojiData;

	$: sizeClass = sizeClasses[emoji.size];
</script>

<div class={sizeClass}>{emoji.text}</div>
