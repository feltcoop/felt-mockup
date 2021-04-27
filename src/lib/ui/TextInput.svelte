<script lang="ts">
	export let value = '';
	$: cleanValue = value.trim();
	export let el: HTMLTextAreaElement | undefined = undefined;
	export let submit: undefined | ((v: any, e: KeyboardEvent) => void) = undefined;
	export let classes = '';
	export let placeholder = '• • •';
	export let submitMatcher: undefined | RegExp = undefined; // optional regexp that includes the input value snapshot BEFORE any current keyboard event is applied
	export let shouldSubmit = (v: string) => (submitMatcher ? submitMatcher.test(v) : true);

	const onKeyDown = (e: KeyboardEvent) => {
		console.log('keydown', e.key);
		switch (e.key) {
			case 'Enter': {
				if (!submit || e.shiftKey || !shouldSubmit(value)) break;
				submit(cleanValue, e); // defer propoagation and default browser action
			}
		}
	};
</script>

<textarea
	class="w-full border-4 border-purple-200 {classes} focus:border-green-300"
	bind:value
	bind:this={el}
	on:keydown={onKeyDown}
	{placeholder}
/>

<style>
	textarea:focus {
		/* // -purple-100 */
		outline: 6px dotted #e9d8fd;
	}
</style>
