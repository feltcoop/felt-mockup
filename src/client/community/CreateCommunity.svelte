<script>
	export let session;

	let newCommunityName = 'community_' + ((Math.random() * 1000000) | 0);

	let errorMessage = null;
	let isSubmitting = false;
	let buttonEl;
	let inputEl;

	const isName = (str) => str.length > 0; // TODO

	const createCommunity = async (name) => {
		if (!name) {
			inputEl.focus();
			errorMessage = 'please enter a community name';
			return;
		}
		if (!isName(name)) {
			inputEl.focus();
			errorMessage = 'please enter a valid community name';
			return;
		}
		buttonEl.focus();
		isSubmitting = true;
		errorMessage = '';
		try {
			// TODO '/api/v1/communities/create' ?
			const response = await fetch('/api/v1/communities', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({name}),
			});
			const responseData = await response.json();
			console.log('responseData', responseData); // TODO logging
			if (response.ok) {
				newCommunityName = '';
				session.update(($session) => ({
					...$session,
					communities: [...$session.communities, responseData.community],
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
	<input type="text" bind:value={newCommunityName} bind:this={inputEl} />
	<button
		on:click|preventDefault={() => createCommunity(newCommunityName)}
		bind:this={buttonEl}
	>create community</button>
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
