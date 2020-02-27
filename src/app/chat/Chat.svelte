<script>
	import ChatMessages from './ChatMessages.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import ChatInput from './ChatInput.svelte';
	import { id } from '../../routes/_data.js';
	import { useSession } from '../session/context.js';
	import { useSelection } from '../selection/context.js';
	import { symbols } from '../ui/symbols.js';

	export let messages;
	export let classes = '';
	export let style = '';
	export let messagesClasses = '';
	export let messagesStyle = '';

	const session = useSession();
	const selection = useSelection();

	let value = '';

	// TODO do this properly! this just infers anon status, which should be a property on the space
	// `inferAuthor` or `getAuthor` could be a pluginable bit of code attached to spaces
	$: author =
		// TODO add optional chaining operator `?`
		messages && messages[0] && messages[0].author === symbols.avatar
			? symbols.avatar
			: $session.person.slug;

	const submit = (content, e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit content', content);
		messages = [
			...(messages || []),
			{ type: 'message', author, id: id(), content },
		];
		value = '';
	};

	const selectMessage = message => {
		console.log('selectMessage', message);
		selection.select(message);
	};

	// TODO need a store per chat that saves the input state
</script>

<!-- TODO how to do height? -->
<div class="flex flex-col {classes}" {style}>
	<div
		class="overflow-y-scroll flex flex-col justify-end flex-1 border-4
		border-b-0 border-purple-200 rounded-tr-lg {messagesClasses}"
		style={messagesStyle}>
		{#if messages && messages.length}
			<ChatMessages {messages} {selectMessage} {selection} />
		{:else}• • •{/if}
		{#if value}
			<div class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
				<ChatMessage message={{ author, content: value }} />
			</div>
		{/if}
	</div>
	<ChatInput bind:value {submit} />
</div>
