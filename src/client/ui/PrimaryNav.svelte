<script>
	import {useWorld} from '../world/context.js';
	import PrimaryNavItem from './PrimaryNavItem.svelte';
	import PrimaryNavSubheading from './PrimaryNavSubheading.svelte';

	export let segment;
	export let worlds;

	const world = useWorld();
	// $: console.log('primary nav world', $world);

	$: personas = worlds.filter((w) => w.type === 'persona');
	$: communities = worlds.filter((w) => w.type === 'community');
	$: friends = worlds.filter((w) => w.type === 'person' && w.slug !== 'rick');
	$: pages = worlds.filter((w) => w.type === 'page');

	let subheadingsOpen = {
		persona: true,
		community: true,
		person: true,
		page: true,
	};
	const toggleSubheading = (subheading) => {
		subheadingsOpen = {
			...subheadingsOpen,
			[subheading]: !subheadingsOpen[subheading],
		};
	};
</script>

<nav>
	<a class="logo" class:selected={segment === undefined} href=".">
		<img src="favicon.png" alt="home" />
	</a>

	<PrimaryNavSubheading
		isOpen={subheadingsOpen.persona}
		isSelected={$world && $world.type === 'persona'}
		on:click={() => toggleSubheading('persona')}
	>
		personas
	</PrimaryNavSubheading>

	{#if subheadingsOpen.persona}
		{#each personas as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}
	{/if}

	<PrimaryNavSubheading
		isOpen={subheadingsOpen.community}
		isSelected={$world && $world.type === 'community'}
		on:click={() => toggleSubheading('community')}
	>
		communities
	</PrimaryNavSubheading>

	{#if subheadingsOpen.community}
		{#each communities as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}
	{/if}

	<PrimaryNavSubheading
		isOpen={subheadingsOpen.person}
		isSelected={$world && $world.type === 'person'}
		on:click={() => toggleSubheading('person')}
	>
		friends
	</PrimaryNavSubheading>

	{#if subheadingsOpen.person}
		{#each friends as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}
	{/if}

	<PrimaryNavSubheading
		isOpen={subheadingsOpen.page}
		isSelected={$world && $world.type === 'page'}
		on:click={() => toggleSubheading('page')}
	>
		felt.dev
	</PrimaryNavSubheading>

	{#if subheadingsOpen.page}
		{#each pages as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}
	{/if}
</nav>

<style>
	nav {
		padding-left: 5px;
	}
	.logo {
		display: block;
		padding: 10px;
	}
	.logo img {
		width: 64px;
		height: 64px;
	}
	.item-icon {
		width: 24px;
		height: 24px;
		border-width: 1px;
		border-style: dashed;
		margin-right: 5px;
		margin-top: 1px;
		margin-bottom: 1px;
	}
</style>
