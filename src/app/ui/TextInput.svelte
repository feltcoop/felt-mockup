<script>
	export let value = '';
	$: cleanValue = value.trim();
	export let el;
	export let submit;
	export let classes = '';
	export let placeholder = '• • •';
	export let submitMatcher; // optional regexp that includes the input value snapshot BEFORE any current keyboard event is applied
	export let shouldSubmit = v => (submitMatcher ? submitMatcher.test(v) : true);

	const onKeyDown = e => {
		switch (e.key) {
			case 'Enter': {
				if (!submit || e.shiftKey || !shouldSubmit(value)) break;
				if (!cleanValue) {
					e.stopPropagation();
					e.preventDefault();
					break;
				}
				submit(cleanValue, e);
				e.stopPropagation();
				e.preventDefault();
			}
		}
	};
</script>

<textarea
	class="w-full border-4 border-purple-200 {classes} focus:outline-none
	focus:border-green-300"
	bind:value
	bind:this={el}
	on:keydown={onKeyDown}
	{placeholder} />
