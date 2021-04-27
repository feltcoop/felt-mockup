<script lang="ts">
	import ForumReplyInput from './ForumReplyInput.svelte';
	import TextButton from '../ui/TextButton.svelte';
	import ForumReply from './ForumReply.svelte';
	import {useSession} from '../session/context';
	import {ForumReplyData, ForumTopicData, id} from '$lib/data';
	import {symbols} from '../ui/symbols';

	const session = useSession();

	export let topic: ForumTopicData;
	export let addReply: (topic: ForumTopicData, reply: ForumReplyData) => void;

	let value: string;
	let isOpen = false; // TODO xstate?

	let commentEl: HTMLTextAreaElement;

	const toggleOpen = (nextValue = !isOpen, focusInput = true) => {
		isOpen = nextValue;
		if (isOpen && focusInput) {
			// TODO is there a better way to schedule this?
			requestAnimationFrame(() => {
				commentEl.focus();
			});
		}
	};

	export let submit = () => {
		console.log('submit', topic, value);
		// TODO publish confirmation
		// TODO show good errors where they occur (forms library!)
		// console.log('submit blog topic', titleValue, contentValue);
		if (!value) {
			commentEl.focus();
			return;
		}
		console.log('submit', $session.person);
		addReply(topic, {
			type: 'reply',
			id: id(),
			author: $session.person.slug,
			content: value,
		});

		value = '';
		toggleOpen(false);
	};
</script>

<TextButton symbol={symbols.command} on:click={() => toggleOpen()}>
	{#if isOpen}stash{:else if value}unstash{:else}reply{/if}
</TextButton>
{#if isOpen && addReply}
	<ForumReplyInput bind:el={commentEl} bind:value {submit} />
	{#if value}
		<div class="px-2 py-1 border-4 border-purple-200 border-bl-lg rounded-bl-lg
			rounded-tr-lg">
			<ForumReply reply={{type: 'reply', id: id(), author: $session.person.slug, content: value}} />
		</div>
	{/if}
{/if}
