<script lang="ts">
	import InboxList from './InboxList.svelte';
	import TextInput from '../ui/TextInput.svelte';
	import InboxListItem from './InboxListItem.svelte';
	import {id} from '$lib/data';
	import type {InboxNoteData} from '$lib/data';
	import {useSession} from '../session/context';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';

	// TODO should type="inbox" be type="activity"?

	const session = useSession();

	export let notes: InboxNoteData[];
	export let classes = '';
	export let style = '';

	let contentValue = '';
	let titleValue = '';
	let contentEl: HTMLTextAreaElement;

	const submit = (_: any, e: KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (!contentValue && !titleValue) {
			contentEl.focus();
			return;
		}
		// console.log('submit content', contentValue, titleValue);
		notes = [
			{
				type: 'note',
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

	const submitTitle = (_: any, e: KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
		contentEl.focus();
	};

	// TODO need a store per chat that saves the input state
</script>

<div class="flex flex-col {classes}" {style}>
	<TextInput
		placeholder="• • • notes notes • • •"
		bind:value={contentValue}
		bind:el={contentEl}
		{submit}
		submitMatcher={/.+\n\n$/}
	/>
	<!-- TODO should `subject` be the data name instead of `title`? -->
	<TextInput placeholder="subject?" bind:value={titleValue} submit={submitTitle} />
	{#if contentValue || titleValue}
		<div class="flex border-4 border-purple-200 rounded-bl-lg rounded-tr-lg">
			<InboxListItem
				note={{
					type: 'note',
					id: id(),
					author: $session.person.slug,
					content: contentValue,
					title: titleValue,
				}}
			/>
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
