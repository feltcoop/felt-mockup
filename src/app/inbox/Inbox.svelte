<script>
	import InboxList from './InboxList.svelte';
	import InboxInput from './InboxInput.svelte';
	import InboxListItem from './InboxListItem.svelte';
	import { id } from '../../routes/_data.js';
	import { useSession } from '../session/context.js';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';

	// TODO should type="inbox" be type="activity"?

	const session = useSession();

	export let notes;
	export let classes = '';
	export let style;

	export let contentValue = '';
	export let titleValue = '';
	export let contentEl;

	const submit = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!contentValue && !titleValue) {
			contentEl.focus();
			return;
		}
		// console.log('submit content', contentValue, titleValue);
		notes = [
			{
				author: $session.person.slug,
				id: id(),
				content: contentValue,
				title: titleValue,
			},
			...notes,
		];
		contentValue = '';
		titleValue = '';
	};

	const submitTitle = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		contentEl.focus();
	};

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col {classes}" {style}>
	<InboxInput
		placeholder="• • • notes notes • • •"
		bind:value={contentValue}
		bind:el={contentEl}
		{submit}
		submitMatcher={/.+\n\n$/} />
	<!-- TODO should `subject` be the data name instead of `title`? -->
	<InboxInput
		placeholder="subject?"
		bind:value={titleValue}
		submit={submitTitle} />
	{#if contentValue || titleValue}
		<div class="flex border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
			<InboxListItem
				note={{ author: $session.person.slug, content: contentValue, title: titleValue }} />
		</div>
	{/if}
	<div class="overflow-y-scroll flex flex-col flex-1">
		{#if notes && notes.length}
			<InboxList {notes} />
		{:else}• • •{/if}
		<PlaceholderInfo>
			<span class="text-2xl">TODO</span>
			toggle these inbox items among various states
		</PlaceholderInfo>
	</div>
</div>
