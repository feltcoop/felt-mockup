<script>
	import WorldName from '../world/WorldName.svelte';
	import {symbols} from '../ui/symbols.js';

	export let message;
</script>

<div>
	<span>
		{#if message.author === symbols.persona}
			<span>{symbols.persona}</span>
		{:else}
			<WorldName name={message.author} />
		{/if}
	</span>
	{@html message.content}
</div>
