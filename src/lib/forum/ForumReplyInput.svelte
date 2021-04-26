<script lang="ts">
	import TextInput from '../ui/TextInput.svelte';

	export let value = '';
	export let el = undefined;
	export let submit = undefined;
	export let classes = '';
	export let placeholder = '• • • enter x3';
	export let submitMatcher = /.+\n\n$/;
</script>

<TextInput bind:value bind:el {submit} {classes} {placeholder} {submitMatcher} />
