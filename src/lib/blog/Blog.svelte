<script lang="ts">
	import Content from '../ui/Content.svelte';
	import BlogPostList from './BlogPostList.svelte';
	import BlogPostInput from './BlogPostInput.svelte';
	import BlogPost from './BlogPost.svelte';
	import Button from '../ui/Button.svelte';
	import {id} from '$lib/data';
	import {useSession} from '../session/context.js';
	import {symbols} from '../ui/symbols.js';

	// TODO the ui here badly needs animations
	// to make it less confusing when you toggle the drafts

	export let posts;
	export let classes = '';
	export let style = '';
	// $: console.log('blog posts', posts);

	let titleValue = '';
	let contentValue = '';

	let titleEl;
	let contentEl;

	let showDraft = false;

	const session = useSession();
	// $: console.log('blog session', $session);

	const toggleDraft = () => {
		showDraft = !showDraft;
		if (showDraft) {
			requestAnimationFrame(() => titleEl.focus());
		}
	};

	$: hasDraft = Boolean(titleValue || contentValue);

	const submit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// TODO publish confirmation
		// TODO show good errors where they occur (forms library!)
		// console.log('submit blog post', titleValue, contentValue);
		if (!titleValue) {
			titleEl.focus();
			return;
		}
		if (!contentValue) {
			contentEl.focus();
			return;
		}
		console.log('submit', $session.person);
		posts = [
			{
				author: $session.person.slug,
				id: id(),
				title: titleValue,
				content: contentValue,
			},
			...posts,
		];
		titleValue = '';
		contentValue = '';
		showDraft = false;
	};
	const submitTitle = (_, e) => {
		e.preventDefault();
		e.stopPropagation();
		contentEl.focus();
	};
	const submitContent = (_, e) => {
		if (contentValue.endsWith('\n\n')) {
			e.preventDefault();
			e.stopPropagation();
			titleEl.focus();
		}
	};
	const addComment = (post, comment) => {
		posts = posts.map((p) => {
			if (p.id !== post.id) return p;
			return {
				...post,
				children: [...(post.children || []), comment],
			};
		});
	};
</script>

<!--
	TODO replace this and other `max-width: 640px` stuff
	with a <Container/> or <Cell /> or <Box /> or something
-->
<div class="flex-1 flex flex-col {classes}" {style}>
	{#if showDraft}
		<BlogPostInput
			bind:value={titleValue}
			bind:el={titleEl}
			placeholder="blog post title • • •"
			submit={submitTitle}
		/>
		<BlogPostInput
			bind:value={contentValue}
			bind:el={contentEl}
			placeholder="• • • content • • •"
			submit={submitContent}
		/>
		<div class="mt-2">
			<Button on:click={toggleDraft}>{symbols.command} stash draft</Button>
			<Button on:click={submit}>{symbols.publish} publish this post</Button>
		</div>
	{:else}
		<div>
			<Button on:click={toggleDraft}>
				{symbols.add}
				{#if hasDraft}resume draft{:else}write a new post{/if}
			</Button>
		</div>
	{/if}
	{#if showDraft && hasDraft}
		<div class="border-4 rounded-bl-lg rounded-tr-lg border-purple-200">
			<BlogPost post={{author: $session.person.slug, title: titleValue, content: contentValue}} />
		</div>
	{/if}
	{#if posts && posts.length}
		<BlogPostList {posts} {addComment} />
	{:else}• • •{/if}
</div>
