<script lang="ts">
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
	<div class="title">
		<a
			class="active-world-link relative bg-purple-100 px-4 cursor-default
			border-dashed rounded-tr-lg rounded-bl-lg border-l-4 border-r-2 border-t-2
			border-b-4 border-purple-200"
			href={$world.slug}
		>
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
	.active-world-link {
		color: #b794f4 !important;
	}
	.active-world-link:active {
		top: -2px;
		border-color: #d6bcfa;
	}
	.title {
		font-size: 1.875rem;
		font-weight: 100;
		margin-bottom: 1rem;
	}
</style>
