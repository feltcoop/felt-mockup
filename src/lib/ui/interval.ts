import {onMount, onDestroy} from 'svelte';

type ClearInterval = () => void;

export const useInterval = (cb: () => void, getTime: () => number): ClearInterval => {
	let timeout: any; // TODO type for Node and browser?
	const run = () => {
		timeout = setTimeout(() => {
			cb();
			run();
		}, getTime());
	};
	const stop = () => {
		clearTimeout(timeout);
		timeout = undefined;
	};
	onMount(() => run());
	onDestroy(() => stop());
	return () => stop();
};
