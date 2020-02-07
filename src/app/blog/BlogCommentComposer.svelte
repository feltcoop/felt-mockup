<script>
	import BlogCommentInput from './BlogCommentInput.svelte';
	import TextButton from '../ui/TextButton.svelte';
	import { useSession } from '../session/context.js';
	import { id } from '../../routes/_data.js';
	import ForumReply from '../forum/ForumReply.svelte';

	const session = useSession();

	export let post;
	export let addComment;
	export let value;
	export let isOpen = false; // TODO xstate?

	let commentEl;

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
		console.log('submit', post, value);
		// TODO publish confirmation
		// TODO show good errors where they occur (forms library!)
		// console.log('submit blog post', titleValue, contentValue);
		if (!value) {
			commentEl.focus();
			return;
		}
		console.log('submit', $session.person);
		addComment(post, {
			author: $session.person.slug,
			id: id(),
			content: value,
		});

		value = '';
		toggleOpen(false);
	};
</script>

{#if isOpen && value}
	<div class="border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
		<ForumReply reply={{ content: value, author: $session.person.slug }} />
	</div>
{/if}
<TextButton symbol="~" on:click={() => toggleOpen()}>
	{#if isOpen}stash{:else}comment{/if}
</TextButton>
{#if isOpen}
	<BlogCommentInput bind:el={commentEl} bind:value {submit} />
{/if}
