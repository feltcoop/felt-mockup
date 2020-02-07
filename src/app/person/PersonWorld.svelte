<script>
	import EntityExplorer from '../ui/EntityExplorer.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';
	import Chat from '../chat/Chat.svelte';
	import Forum from '../forum/Forum.svelte';
	import Blog from '../blog/Blog.svelte';
	import Inbox from '../inbox/Inbox.svelte';

	export let world;

	let subpage = 0;

	$: chatMessages = $world.spaces[0].messages;
	$: forumTopics = $world.spaces[2].topics;
	$: blogPosts = $world.spaces[0].posts;
	$: inboxNotes = (() => {
		const space = $world.spaces.find(s => s.type === 'inbox');
		return space && space.notes;
	})();
</script>

<div class="flex flex-col">
	<label class="flex items-center">
		<input type="radio" bind:group={subpage} class="mr-2" value={0} />
		<PlaceholderInfo interactive={true}>
			show {$world.title}'s custom homepage and other helpful info
		</PlaceholderInfo>
	</label>
	<label class="flex items-center">
		<input type="radio" bind:group={subpage} class="mr-2" value={1} />
		<PlaceholderInfo interactive={true}>show raw data</PlaceholderInfo>
	</label>
</div>

{#if subpage === 0}
	<PlaceholderInfo>
		TODO show {$world.title}'s custom homepage and other helpful info
	</PlaceholderInfo>
	{#if chatMessages}
		<Chat messages={chatMessages} messagesStyle={'max-height: 300px;'} />
		<Forum
			topics={forumTopics}
			classes="mb-4 mt-20"
			topicsStyle={'max-height: 300px;'} />
	{:else}
		{#if blogPosts}
			<Inbox notes={inboxNotes} classes="mb-4" />
		{/if}
		{#if blogPosts}
			<Blog posts={blogPosts} classes="mb-4 mt-20" />
		{/if}
	{/if}
{:else}
	<EntityExplorer entity={$world} />
{/if}

{#if $world.content}{$world.content}{/if}
