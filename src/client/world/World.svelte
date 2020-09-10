<script>
	import PersonWorld from '../person/PersonWorld.svelte';
	import PersonaWorld from '../persona/PersonaWorld.svelte';
	import CommunityWorld from '../community/CommunityWorld.svelte';
	import PageWorld from '../page/PageWorld.svelte';
	import ErrorMessage from '../ui/ErrorMessage.svelte';

	export let world;
</script>

<!-- TODO where should this padding ideally go? -->
<div style="max-width: 640px;">
	<!-- TODO componentize - SpaceBreadcrumb or PathBreadcrumb or SlugBreadcrumb -->
	<!-- TODO make this transition with the equivalent component (and DOM element) in `<Space/>` -->
	<div><a href={$world.slug}>{$world.title}</a></div>
	{#if $world.description}
		<div>
			{@html $world.description}
		</div>
	{/if}
	<!-- 
	{#each $world.children as space}
		<Space {world} {space} />
	{/each} -->
	<div>
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
