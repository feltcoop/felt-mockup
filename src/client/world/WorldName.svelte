<script lang="ts">
	import {useSession} from '../session/context.js';
	import {symbols} from '../ui/symbols.js';

	const session = useSession();
	// console.log('worldname session', session);

	export let name;
	export let isMention = false;
	export let classes = '';
	export let style = '';
	export let innerClasses = '';

	$: isAnonymous = name === symbols.persona;
	$: isSession = name === $session.person.slug;
	$: href = isAnonymous ? undefined : name;
	$: colorClasses = isSession ? 'text-purple-700' : 'text-green-700';
	// $: console.log('href', href, name, isAnonymous, symbols.persona);
</script>

<a {href} class="hover:underline {classes}
	{colorClasses}
	{innerClasses}" {style}>
	{#if isAnonymous}
		<span class="text-2xl leading-none">{name}</span>
	{:else}
		{#if isMention}
			<span class="opacity-50">@</span>
		{/if}
		{name}
	{/if}
</a>

<style>
	a:focus {
		outline: 3px dotted rgba(84, 153, 73, 0.75);
	}
</style>
