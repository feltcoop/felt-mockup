import { onMount, onDestroy } from 'svelte';
export const useInterval = (cb, getTime) => {
    let timeout;
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
