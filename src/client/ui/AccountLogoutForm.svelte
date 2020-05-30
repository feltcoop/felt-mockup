<script>
	import {stores} from '@sapper/app';

	import Button from '../ui/Button.svelte';
	import WaitingAnimation from '../ui/WaitingAnimation.svelte';

	const {session} = stores();

	let errorMessage;
	let isSubmitting;

	$: isDisabled = isSubmitting || !$session.account;

	const submitEmail = async (e) => {
		isSubmitting = true;
		errorMessage = '';
		try {
			const response = await fetch('/api/v1/accounts/logout', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
			});
			const responseData = await response.json();
			console.log('responseData', responseData); // TODO logging
			if (response.ok) {
				errorMessage = '';
				$session = {isGuest: true};
			} else {
				console.error('response', response); // TODO logging
				errorMessage = `Something went wrong. Maybe check your Internet connection? Here's what the server said: "${responseData.reason}"`;
			}
		} catch (err) {
			console.error('err', err); // TODO logging
			errorMessage = `Something went wrong. Is your Internet connection working? Maybe Felt's server is busted. Please try again!`;
		} finally {
			isSubmitting = false;
		}
	};

	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			submitEmail(e);
		}
	};
</script>

<Button on:click={submitEmail} disabled={isDisabled}>
	{#if isSubmitting}
		<WaitingAnimation />
	{:else}log out{/if}
</Button>
{#if errorMessage}
	<div>
		<p class="error">{errorMessage}</p>
	</div>
{/if}

<style>
	/*  TODO global classes? */
	.error {
		font-weight: bold;
		color: rgb(73, 84, 153);
	}
</style>
