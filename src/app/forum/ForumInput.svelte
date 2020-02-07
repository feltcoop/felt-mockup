<script>
	import TextInput from '../ui/TextInput.svelte';

	// TODO doesn't do anything ... yet .. remove if this doesn't make sense!

	export let value = '';
	export let el;
	export let submit;
	export let classes = '';
	export let placeholder;
</script>

<TextInput bind:value bind:el {submit} {classes} {placeholder} />
