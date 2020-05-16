<script>
	export let value = '';
	$: cleanValue = value.trim();
	export let el = undefined;
	export let submit = undefined;
	export let placeholder = '• • •';
	export let submitMatcher = undefined; // optional regexp that includes the input value snapshot BEFORE any current keyboard event is applied
	export let shouldSubmit = v => (submitMatcher ? submitMatcher.test(v) : true);

	const onKeyDown = e => {
		console.log('keydown', e.key);
		switch (e.key) {
			case 'Enter': {
				if (!submit || e.shiftKey || !shouldSubmit(value)) break;
				submit(cleanValue, e); // defer propoagation and default browser action
			}
		}
	};
</script>

<textarea bind:value bind:this={el} on:keydown={onKeyDown} {placeholder} />
