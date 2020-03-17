<script>
	import WorldName from '../world/WorldName.svelte';
	import { symbols } from '../ui/symbols.js';

	export let message;
	export let selectMessage;
	export let isSelected;
	export let classes = '';
	$: selectedClasses = isSelected
		? 'border-4 border-green-200 rounded-bl-lg rounded-tr-lg'
		: '';
</script>

<div
	class="py-1 {classes}
	{selectedClasses}"
	on:click={selectMessage ? () => selectMessage(message) : undefined}
	class:selected={isSelected}>
	<span class="px-2">
		{#if message.author === symbols.persona}
			<span class="text-2xl leading-none">{symbols.persona}</span>
		{:else}
			<WorldName name={message.author} />
		{/if}
	</span>
	{@html message.content}
</div>

<style>

</style>
