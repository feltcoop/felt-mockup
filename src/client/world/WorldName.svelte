<script>
	import {useSession} from '../session/context.js';
	import {symbols} from '../ui/symbols.js';

	const session = useSession();

	export let name;
	export let isMention = false;

	$: isAnonymous = name === symbols.persona;
	$: href = isAnonymous ? undefined : name;
</script>

<a {href}>
	{#if isAnonymous}
		<span>{name}</span>
	{:else}
		{#if isMention}<span>@</span>{/if}
		{name}
	{/if}
</a>
