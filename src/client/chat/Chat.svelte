<script>
	import ChatMessages from './ChatMessages.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import ChatInput from './ChatInput.svelte';
	import {id} from '../../routes/_data.js';
	import {useSession} from '../session/context.js';
	import {symbols} from '../ui/symbols.js';

	export let messages;

	const session = useSession();

	let value = '';

	// TODO do this properly! this just infers anon status, which should be a property on the space
	// `inferAuthor` or `getAuthor` could be a pluginable bit of code attached to spaces
	$: author =
		// TODO add optional chaining operator `?`
		messages && messages[0] && messages[0].author === symbols.persona
			? symbols.persona
			: $session.person.slug;

	const submit = (content, e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit content', content);
		messages = [
			...(messages || []),
			{type: 'message', author, id: id(), content},
		];
		value = '';
	};

	// TODO need a store per chat that saves the input state
</script>

<!-- TODO how to do height? -->
<div>
	<div>
		{#if messages && messages.length}
			<ChatMessages {messages} />
		{:else}• • •{/if}
		{#if value}
			<div class="draft">
				<ChatMessage message={{author, content: value}} />
			</div>
		{/if}
	</div>
	<ChatInput bind:value {submit} />
</div>

<style>
	.draft {
		border: 3px solid purple;
	}
</style>
