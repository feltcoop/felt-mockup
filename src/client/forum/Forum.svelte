<script>
	import ForumTopicsList from './ForumTopicsList.svelte';
	import ForumTopicsListItem from './ForumTopicsListItem.svelte';
	import ForumInput from './ForumInput.svelte';
	import Button from '../ui/Button.svelte';
	import {id} from '../../routes/_data.js';
	import {slugify} from '../url/utils.js';
	import {useSession} from '../session/context.js';
	import {useSelection} from '../selection/context.js';
	import {symbols} from '../ui/symbols.js';

	export let topics;

	const session = useSession();
	const selection = useSelection();
	// $: console.log(`selection`, $selection);

	// TODO do this properly! this just infers anon status, which should be a property on the space
	// `inferAuthor` or `getAuthor` could be a pluginable bit of code attached to spaces
	$: author =
		topics[0] && topics[0].author === symbols.persona
			? symbols.persona
			: $session.person.slug;

	let titleValue = '';
	let contentValue = '';
	let titleEl;
	let contentEl;

	$: hasDraft = Boolean(titleValue || contentValue);

	let showDraft = false;

	const toggleDraft = () => {
		showDraft = !showDraft;
		if (showDraft) {
			requestAnimationFrame(() => titleEl.focus());
		}
	};

	$: slug = slugify(titleValue);

	const submit = e => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('submit content', titleValue, contentValue);
		if (!titleValue) {
			titleEl.focus();
			return;
		}
		topics = [
			{
				author,
				id: id(),
				content: contentValue,
				title: titleValue,
				slug,
			},
			...topics,
		];
		titleValue = '';
		contentValue = '';
		toggleDraft();
	};
	const submitTitle = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		contentEl.focus();
	};
	const submitContent = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		titleEl.focus();
	};

	const addReply = (topic, child) => {
		// TODO handle nesting
		topics = topics.map(p => {
			if (p.id !== topic.id) return p;
			return {
				...topic,
				children: [child, ...(topic.children || [])],
			};
		});
	};
	const selectReply = reply => {
		console.log('select reply', reply);
		selection.select(reply);
	};

	// TODO need a store per chat that saves the input state
</script>

<!-- TODO how to do height? -->
<div>
	<div>
		{#if showDraft}
			<Button on:click={toggleDraft}>{symbols.command} stash draft</Button>
			<Button on:click={submit}>{symbols.publish} publish this draft</Button>
		{:else if hasDraft}
			<Button on:click={toggleDraft}>{symbols.add} resume draft</Button>
		{:else}
			<Button on:click={toggleDraft}>{symbols.add} add a topic</Button>
		{/if}
	</div>
	{#if showDraft}
		<!-- TODO make this first one shorter -->
		<ForumInput
			bind:el={titleEl}
			bind:value={titleValue}
			placeholder="title • • •"
			submit={submitTitle} />
		<ForumInput
			bind:el={contentEl}
			bind:value={contentValue}
			placeholder="• • • content!"
			submit={submitContent} />
		{#if hasDraft}
			<div class="draft">
				<ForumTopicsListItem
					topic={{author, slug, title: titleValue, content: contentValue}} />
			</div>
		{/if}
	{/if}
	{#if topics && topics.length}
		<div>
			<ForumTopicsList {topics} {addReply} {selectReply} {selection} />
		</div>
	{:else}• • •{/if}
</div>

<style>
	.draft {
		border: 3px solid purple;
	}
</style>
