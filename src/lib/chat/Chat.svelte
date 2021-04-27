<script lang="ts">
	import ChatMessages from './ChatMessages.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import TextInput from './TextInput.svelte';
	import {ChatMessageData, id} from '$lib/data';
	import {useSession} from '../session/context';
	import {useSelection} from '../selection/context';
	import {symbols} from '../ui/symbols';
	import type {SelectionStoreState} from '$lib/selection/store';

	export let messages: ChatMessageData[];
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
		messages && messages[0] && messages[0].author === symbols.persona
			? symbols.persona
			: $session.person.slug;

	const submit = (content: string, e: KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit content', content);
		messages = [...(messages || []), {type: 'message', author, id: id(), content}];
		value = '';
	};

	const selectMessage = (message: SelectionStoreState) => {
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
		style={messagesStyle}
	>
		{#if messages && messages.length}
			<ChatMessages {messages} {selectMessage} {selection} />
		{:else}• • •{/if}
		{#if value}
			<div class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
				<ChatMessage message={{type: 'message', id: id(), author, content: value}} />
			</div>
		{/if}
	</div>
	<TextInput bind:value {submit} />
</div>
