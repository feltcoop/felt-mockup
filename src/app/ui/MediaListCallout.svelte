<script>
	import { scale } from 'svelte/transition';

	import { isEmail } from '../email/utils.js';
	import Button from '../ui/Button.svelte';
	import Content from '../ui/Content.svelte';
	import WaitingAnimation from '../ui/WaitingAnimation.svelte';
	import EmailInput from '../email/EmailInput.svelte';

	let email = process.env.NODE_ENV === 'development' ? 'hi@test.com' : '';
	let submittedEmail;
	let inputEl;
	let buttonEl;
	let errorMessage;
	let submitting;

	const submit = async e => {
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
		submitting = true;
		errorMessage = '';
		// await new Promise(r => setTimeout(r, 1000000));
		try {
			const res = await fetch('/mailing-list', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});
			if (res.ok) {
				submitting = false;
				submittedEmail = email;
				email = '';
				errorMessage = '';
			} else {
				submitting = false;
				errorMessage = `Something went wrong. Maybe check your Internet connection? Here's what the server said: "${res.statusText}"`;
			}
		} catch (err) {
			submitting = false;
			errorMessage = `Something went wrong. Is your Internet connection working? Please try again!`;
		}
	};

	const onKeyPress = e => {
		if (e.key === 'Enter') {
			submit(e);
		}
	};
</script>

<Content classes="wrapper relative" style="height: 160px;">
	{#if !submittedEmail}
		<div in:scale class="inner-wrapper">
			<h2>want more? join our mailing list!</h2>
			<div class="input-wrapper">
				<EmailInput
					bind:el={inputEl}
					bind:value={email}
					on:keypress={onKeyPress}
					disabled={submitting}
					placeholder="email@address.com" />

				<Button bind:el={buttonEl} on:click={submit} disabled={submitting}>
					{#if submitting}
						<WaitingAnimation />
					{:else}send me updates!{/if}
				</Button>
			</div>
			{#if errorMessage}
				<div>
					<p class="error">{errorMessage}</p>
				</div>
			{/if}
		</div>
	{:else}
		<div in:scale class="inner-wrapper">
			<h2>thank you for your interest!!</h2>
			<p>
				we'll contact you at
				<span class="submitted-email">{submittedEmail}</span>
				when we're ready to share
			</p>
		</div>
	{/if}
</Content>

<style>
	.wrapper {
		height: 180px; /* hardcoded bc children are absolute pos for transiton */
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.wrapper > div {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.inner-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.error {
		font-weight: bold;
		color: rgb(73, 84, 153);
	}
	.input-wrapper {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		margin-bottom: 1em;
	}
	/* button {
		border-radius: 3px;
		border-width: 2px;
		padding: 10px 16px;
		border-color: rgb(73, 84, 153);
		position: relative;
		background-color: rgba(73, 84, 153, 0.1);
		box-shadow: 0 -4px 20px 1px rgba(73, 84, 153, 0.1) inset,
			0 -2px 5px 1px rgba(73, 84, 153, 0.2) inset;
	}
	button:hover {
		background-color: rgba(73, 84, 153, 0.15);
		box-shadow: 0 -4px 20px 1px rgba(73, 84, 153, 0.2) inset,
			0 -2px 5px 1px rgba(73, 84, 153, 0.4) inset;
	}
	button:active {
		top: 1px;
		box-shadow: 0 4px 30px 1px rgba(73, 84, 153, 0.35) inset,
			0 2px 10px 1px rgba(73, 84, 153, 0.55) inset;
	}
	button[disabled] {
		top: 0;
		background-color: rgba(203, 208, 233, 0.35);
		box-shadow: 0 -4px 30px 1px rgba(221, 223, 233, 0.3) inset,
			0 -1px 10px 1px rgba(220, 222, 230, 0.5) inset;
	} */
	p {
		margin: 0 0 0.5em;
	}
	.submitted-email {
		font-weight: bold;
		color: #495499;
	}
</style>
