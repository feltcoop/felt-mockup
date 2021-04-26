<script lang="ts">
	import {useWorld} from '../world/context.js';
	import PrimaryNavItem from './PrimaryNavItem.svelte';
	import PrimaryNavSubheading from './PrimaryNavSubheading.svelte';

	export let segment;
	export let worlds;

	const world = useWorld();
	// $: console.log('primary nav world', $world);

	// TODO juice - highlight the subheadings when their section has the active world,
	// maybe with an animating object that moves slowly between the subheadings

	// TODO give actions go the subheadings
	// should these link to stuff within your account (person's) view?
	// the nav grouping is itself a resource within your current session.
	// users should be able to share their layouts
	// with friends or the public or other audiences.

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
	<ul class="pl-2">
		<li class="logo">
			<a class:selected={segment === undefined} href=".">
				<img src="favicon.png" alt="home" class="felt-icon" />
			</a>
		</li>

		<PrimaryNavSubheading
			isActive={$world && $world.type === 'persona'}
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
			isActive={$world && $world.type === 'community'}
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
			isActive={$world && $world.type === 'person'}
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
			isActive={$world && $world.type === 'page'}
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
	</ul>
</nav>

<style lang="postcss">
	nav {
		height: 100%;
	}
	nav li {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/* TODO this is duplicated in the component */
	.logo a {
		position: relative;
		display: block;
		padding: 10px;
		color: inherit;
		width: 100%;
		height: 100%;
	}
	.logo a:active {
		top: 1px;
	}
	.logo a.selected:active {
		top: -2px;
	}
	.logo a.selected {
		@apply text-purple-700;
		cursor: default;
		@apply bg-purple-100;
	}
	.logo a.selected {
		@apply bg-transparent;
	}
	.logo a:hover .felt-icon {
		@apply border-green-300;
	}
	.logo a:active .felt-icon {
		@apply border-green-500;
	}
	.logo a.selected .felt-icon {
		@apply border-primary;
	}
	.felt-icon {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		border: 2px dashed transparent;
		max-width: none;
		padding: 10px;
		@apply bg-green-100 border-green-200;
	}
	.item-icon {
		width: 24px;
		height: 24px;
		@apply mr-3;
		@apply border-purple-200;
		border-width: 3px;
		border-style: dashed;
	}
</style>
