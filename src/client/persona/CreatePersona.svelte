<script>
	export let session;

	let newPersonaName = 'persona_' + ((Math.random() * 1000000) | 0);

	let errorMessage = null;
	let isSubmitting = false;
	let buttonEl;
	let inputEl;

	const isName = (str) => str.length > 0; // TODO see discussion in src/personas/PersonasRepo.ts

	const createPersona = async (name) => {
		if (!name) {
			inputEl.focus();
			errorMessage = 'please enter a persona name';
			return;
		}
		if (!isName(name)) {
			inputEl.focus();
			errorMessage = 'please enter a valid persona name';
			return;
		}
		buttonEl.focus();
		isSubmitting = true;
		errorMessage = '';
		try {
			// TODO '/api/v1/personas/create' ?
			const response = await fetch('/api/v1/personas', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({name}),
			});
			const responseData = await response.json();
			console.log('responseData', responseData); // TODO logging
			if (response.ok) {
				newPersonaName = '';
				session.update(($session) => ({
					...$session,
					personas: [...$session.personas, responseData.persona],
				}));
			} else {
				console.error('response', response); // TODO logging
				errorMessage =
					responseData.reason || 'Something went wrong. Maybe check your Internet connection?';
			}
		} catch (err) {
			console.error('err', err); // TODO logging
			errorMessage = `Something went wrong. Is your Internet connection working? Maybe Felt's server is busted. Please try again!`;
		} finally {
			isSubmitting = false;
		}
	};
</script>

<form>
	<input type="text" bind:value={newPersonaName} bind:this={inputEl} />
	<button on:click|preventDefault={() => createPersona(newPersonaName)} bind:this={buttonEl}>create
		persona</button>
</form>

{#if errorMessage}
	<div class="error">{errorMessage}</div>
{/if}

<style>
	.error {
		font-weight: bold;
		color: red;
	}
</style>
