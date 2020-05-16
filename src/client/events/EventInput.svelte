<script>
	import TextInput from '../ui/TextInput.svelte';

	// TODO doesn't do anything ... yet .. remove if this doesn't make sense!

	export let value = '';
	export let el = undefined;
	export let submit = undefined;
	export let placeholder = undefined;
</script>

<TextInput bind:value bind:el {submit} {placeholder} />
