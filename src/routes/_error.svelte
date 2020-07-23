<script>
	export let status;
	export let error;

	const __DEV__ = process.env.NODE_ENV === 'development'; // TODO replace in build step
</script>

<svelte:head>
	<title>felt error {status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if __DEV__ && error.stack}
	<pre>{error.stack}</pre>
{/if}
