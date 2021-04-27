<script lang="ts">
	import TextInput from '../ui/TextInput.svelte';

	export let value = '';
	export let el: HTMLTextAreaElement | undefined = undefined;
	export let submit: ((value: string, e: KeyboardEvent) => void) | undefined = undefined;
	export let classes = '';
	export let placeholder = '• • • enter x3';
	export let submitMatcher = /.+\n\n$/;
</script>

<TextInput bind:value bind:el {submit} {classes} {placeholder} {submitMatcher} />
