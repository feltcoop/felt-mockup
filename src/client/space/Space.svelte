<script>
	import Content from '../ui/Content.svelte';
	import Chat from '../chat/Chat.svelte';
	import Forum from '../forum/Forum.svelte';
	import Blog from '../blog/Blog.svelte';
	import Inbox from '../inbox/Inbox.svelte';
	import Notes from '../notes/Notes.svelte';
	import Activities from '../activity/Activities.svelte';
	import Events from '../events/Events.svelte';
	import Emojis from '../emoji/Emojis.svelte';
	import ErrorMessage from '../ui/ErrorMessage.svelte';
	import {symbols} from '../ui/symbols.js';

	export let world;
	export let space;
</script>

<!-- TODO where should this padding ideally go? -->
<div style="max-width: 640px">
	<!-- TODO componentize - SpaceBreadcrumb or PathBreadcrumb or SlugBreadcrumb -->
	<div style="display: flex;">
		<a href={$world.slug}>{$world.title}</a>
		<!--
				TODO this `/` should be a thick chunky line that is
				centered at the junction between the two path items,
				and dark green on the left half and dark purple on the right.
				(how? blending? svg? canvas? animate it into place?)
			-->
		<div>/</div>
		<a href="{$world.slug}/{$space.slug}">{$space.title} {symbols[$space.type] || symbols.other}</a>
	</div>
	{#if $space.description}
		<Content>
			{@html $space.description}
		</Content>
	{/if}

	<!-- TODO maybe use `<svelte:component>` and pass the entire space? -->
	<div>
		{#if $space.type === 'chat'}
			<Chat messages={$space.messages} />
		{:else if $space.type === 'forum'}
			<Forum topics={$space.topics} />
		{:else if $space.type === 'blog'}
			<Blog posts={$space.posts} />
		{:else if $space.type === 'inbox'}
			<Inbox notes={$space.notes} />
		{:else if $space.type === 'notes'}
			<Notes notes={$space.notes} />
		{:else if $space.type === 'activities'}
			<Activities activities={$space.activities} />
		{:else if $space.type === 'events'}
			<Events events={$space.events} />
		{:else if $space.type === 'emojis'}
			<Emojis emojis={$space.emojis} values={$space.values} />
		{:else}
			<ErrorMessage message={`Unknown space type "${$space.type}"`} />
		{/if}
	</div>
</div>
