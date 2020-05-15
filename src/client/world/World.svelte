<script>
	import PersonWorld from '../person/PersonWorld.svelte';
	import PersonaWorld from '../persona/PersonaWorld.svelte';
	import CommunityWorld from '../community/CommunityWorld.svelte';
	import PageWorld from '../page/PageWorld.svelte';
	import ErrorMessage from '../ui/ErrorMessage.svelte';

	export let world;
</script>

<!-- TODO where should this padding ideally go? -->
<div class="flex flex-col flex-1 p-2" style="max-width: 640px;">
	<!-- TODO componentize - SpaceBreadcrumb or PathBreadcrumb or SlugBreadcrumb -->
	<!-- TODO make this transition with the equivalent component (and DOM element) in `<Space/>` -->
	<div class="text-3xl font-hairline mb-4">
		<a
			class="active-world-link relative bg-purple-100 px-4 cursor-default
			border-dashed rounded-tr-lg rounded-bl-lg border-l-4 border-r-2 border-t-2
			border-b-4 border-purple-200"
			href={$world.slug}>
			{$world.title}
		</a>
	</div>
	{#if $world.description}
		<div class="mb-4">
			{@html $world.description}
		</div>
	{/if}
	<!-- 
	{#each $world.children as space}
		<Space {world} {space} />
	{/each} -->
	<div class="flex-1">
		{#if $world.type === 'person'}
			<PersonWorld {world} />
		{:else if $world.type === 'persona'}
			<PersonaWorld {world} />
		{:else if $world.type === 'community'}
			<CommunityWorld {world} />
		{:else if $world.type === 'page'}
			<PageWorld {world} />
		{:else}
			<ErrorMessage message={`Unknown world type "${$world.type}"`} />
		{/if}
	</div>
</div>

<style>
	/* .active-world-link {
		@apply text-purple-400 !important;
	} */
	.active-world-link:active {
		top: -2px;
		/* @apply border-purple-300; */
	}
</style>
