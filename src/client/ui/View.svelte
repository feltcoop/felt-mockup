<script>
	import { views } from './views.js';

	export let view; // `: ViewData`

	const getViewByComponent = (views, componentName) => {
		const view = views[componentName];
		if (!view) throw Error(`Unable to find view "${componentName}"`);
		return view;
	};

	$: viewComponent = getViewByComponent(views, view.component);
</script>

<svelte:component this={viewComponent} {view} />
