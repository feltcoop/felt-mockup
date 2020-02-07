<script>
	import { useWorld } from '../world/context.js';
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

	$: avatars = worlds.filter(w => w.type === 'avatar');
	$: communities = worlds.filter(w => w.type === 'community');
	$: people = worlds.filter(w => w.type === 'person');
	$: pages = worlds.filter(w => w.type === 'page');
	$: {
		const expectedCount = worlds.length;
		const actualCount =
			avatars.length + communities.length + people.length + pages.length;
		if (actualCount !== expectedCount) {
			// TODO do this debug check better, elide in prod
			console.error(
				`not all work nav items are getting rendered: ${actualCount} / ${expectedCount}`,
			);
		}
	}
</script>

<nav>
	<ul class="pl-2">
		<li class="logo">
			<a class:selected={segment === undefined} rel="prefetch" href=".">
				<img src="favicon.png" alt="home" class="felt-icon" />
			</a>
		</li>

		<PrimaryNavSubheading isActive={$world && $world.type === 'avatar'}>
			avatars
		</PrimaryNavSubheading>

		{#each avatars as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}

		<PrimaryNavSubheading isActive={$world && $world.type === 'community'}>
			communities
		</PrimaryNavSubheading>

		{#each communities as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}

		<PrimaryNavSubheading isActive={$world && $world.type === 'person'}>
			friends
		</PrimaryNavSubheading>

		{#each people as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}

		<PrimaryNavSubheading isActive={$world && $world.type === 'page'}>
			felt.dev
		</PrimaryNavSubheading>

		{#each pages as world}
			<PrimaryNavItem isSelected={segment === world.slug} href={world.slug}>
				<div class="item-icon" />
				{world.title}
			</PrimaryNavItem>
		{/each}

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
