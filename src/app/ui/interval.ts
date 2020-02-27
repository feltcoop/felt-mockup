import { onMount, onDestroy } from 'svelte';

export const useInterval = (cb: () => void, getTime: () => number | null) => {
	let timeout: number | undefined;
	const run = () => {
		const time = getTime();
		if (time === null) return;
		timeout = setTimeout(() => {
			cb();
			run();
		}, time);
	};
	onMount(() => {
		run();
	});
	onDestroy(() => {
		clearTimeout(timeout);
	});
};
