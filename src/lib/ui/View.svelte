<script lang="ts">
	import type {SvelteComponent} from 'svelte';

	import type {ViewData} from '$lib/data';
	import {views} from './views';

	export let view: ViewData;

	const getViewByComponent = (
		views: {[key: string]: SvelteComponent},
		componentName: string,
	): SvelteComponent => {
		const view = (views as any)[componentName]; // TODO type
		if (!view) throw Error(`Unable to find view "${componentName}"`);
		return view;
	};

	$: viewComponent = getViewByComponent(views as any, view.component);
</script>

<svelte:component this={viewComponent} {view} />
