<script>
	export let el = undefined;
	export let value = '';
	export let placeholder = 'email@address.com';
	export let disabled = false;
</script>

<input
	class="border-2 rounded-tr-lg rounded-bl-lg"
	bind:this={el}
	type="email"
	bind:value
	on:keypress
	{disabled}
	{placeholder} />

<style>
	input {
		border-color: rgb(73, 84, 153);
		padding: 10px 16px;
		text-align: center;
		margin-bottom: 10px;
	}
	input:focus {
		border-color: rgb(88, 101, 185);
		box-shadow: 0 4px 20px 1px rgba(73, 84, 153, 0.2),
			0 1px 5px 1px rgba(73, 84, 153, 0.4);
	}
	input[disabled] {
		background-color: rgba(203, 208, 233, 0.35);
	}
</style>
