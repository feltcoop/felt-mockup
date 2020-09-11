<script>
	import {stores} from '@sapper/app';

	import {isEmail} from '../email/email.js';
	import Button from '../ui/Button.svelte';
	import WaitingAnimation from '../ui/WaitingAnimation.svelte';
	import EmailInput from '../email/EmailInput.svelte';

	const {session} = stores();

	// TODO This code conveniently populates the login form.
	// Might want to move it to a store and/or remove for production.
	const EMAIL_STORAGE_KEY = 'FELT__email';
	const loadEmail = () => {
		return (
			(typeof localStorage !== 'undefined' && localStorage.getItem(EMAIL_STORAGE_KEY)) || 'a@a.a'
		);
	};
	const saveEmail = (email) => {
		if (typeof localStorage !== 'undefined') localStorage.setItem(EMAIL_STORAGE_KEY, email);
	};

	let email = loadEmail();
	let submittedEmail;
	let inputEl;
	let buttonEl;
	let errorMessage;
	let isSubmitting;

	$: isDisabled = isSubmitting || !!$session.account;

	const submitEmail = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!email) {
			inputEl.focus();
			errorMessage = 'please enter an email address :)';
			return;
		}
		if (!isEmail(email)) {
			inputEl.focus();
			errorMessage = 'please enter a valid email address :)';
			return;
		}
		buttonEl.focus();
		isSubmitting = true;
		errorMessage = '';
		try {
			saveEmail(email);
			const response = await fetch('/api/v1/accounts/login', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email,
					redirectPath: window.location.href.slice(window.location.origin.length),
				}),
			});
			const responseData = await response.json();
			console.log('responseData', responseData); // TODO logging
			if (response.ok) {
				submittedEmail = email;
				email = '';
				errorMessage = '';
				if (responseData.session) {
					// In dev mode, email login is bypassed by default,
					// so if it returns a session, we can use it directly.
					$session = responseData.session;
				}
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

{#if !submittedEmail}
	<EmailInput
		bind:el={inputEl}
		bind:value={email}
		on:keypress={onKeyPress}
		disabled={isDisabled}
		placeholder="email@address.com"
	/>
	<Button bind:el={buttonEl} on:click={submitEmail} disabled={isDisabled}>
		{#if isSubmitting}
			<WaitingAnimation />
		{:else}log in or sign up{/if}
	</Button>
	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}
{:else}
	<div>
		we're sending an email to <span class="submitted-email">{submittedEmail}</span> to get you logged
		in
	</div>
{/if}

<style>
	.error {
		font-weight: bold;
		color: rgb(73, 84, 153);
	}
	.submitted-email {
		font-weight: bold;
		color: #495499;
	}
</style>
