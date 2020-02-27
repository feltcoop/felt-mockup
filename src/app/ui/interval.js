import { onMount, onDestroy } from 'svelte';
export const useInterval = (cb, getTime) => {
    let timeout;
    const run = () => {
        const time = getTime();
        if (time === null)
            return;
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
