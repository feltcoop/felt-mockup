<script lang="ts">
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
	export let classes = '';
</script>

<!-- TODO where should this padding ideally go? -->
<div class="flex flex-col flex-1 p-2" style="max-width: 640px;">
	<!-- TODO componentize - SpaceBreadcrumb or PathBreadcrumb or SlugBreadcrumb -->
	<div class="address">
		<a
			class="bg-green-100 px-4 rounded-bl-lg border-dashed border-l-4 border-t-2
			border-b-4 border-green-200 text-green-700"
			href={$world.slug}
		>
			{$world.title}
		</a>
		<!--
				TODO this `/` should be a thick chunky line that is
				centered at the junction between the two path items,
				and dark green on the left half and dark purple on the right.
				(how? blending? svg? canvas? animate it into place?)
			-->
		<div class="w-0 z-10 text-gray-500 relative" style="left: -5px;">/</div>
		<a
			class="active-space-link bg-purple-100 px-4 border-r-2 border-t-2
			border-b-4 border-purple-200 cursor-default rounded-tr-lg border-dashed
			whitespace-no-wrap"
			href="{$world.slug}/{$space.slug}"
		>
			{$space.title}
			{symbols[$space.type] || symbols.other}
		</a>
	</div>
	{#if $space.description}
		<Content>
			{@html $space.description}
		</Content>
	{/if}

	<!-- TODO maybe use `<svelte:component>` and pass the entire space? -->
	<div class="flex-1">
		{#if $space.type === 'chat'}
			<Chat messages={$space.messages} {classes} />
		{:else if $space.type === 'forum'}
			<Forum topics={$space.topics} {classes} />
		{:else if $space.type === 'blog'}
			<Blog posts={$space.posts} {classes} />
		{:else if $space.type === 'inbox'}
			<Inbox notes={$space.notes} {classes} />
		{:else if $space.type === 'notes'}
			<Notes notes={$space.notes} {classes} />
		{:else if $space.type === 'activities'}
			<Activities activities={$space.activities} {classes} />
		{:else if $space.type === 'events'}
			<Events events={$space.events} {classes} />
		{:else if $space.type === 'emojis'}
			<Emojis emojis={$space.emojis} values={$space.values} {classes} />
		{:else}
			<ErrorMessage message={`Unknown space type "${$space.type}"`} />
		{/if}
	</div>
</div>

<style>
	.active-space-link {
		color: #b794f4 !important;
	}
	a {
		position: relative;
	}
	a:active {
		top: 2px;
		border-color: #9ae6b4;
	}
	.active-space-link:active {
		top: -2px;
		border-color: #d6bcfa;
	}
	.address {
		margin-bottom: 1rem;
		display: flex;
		font-size: 1.875rem;
		font-weight: 100;
	}
</style>
