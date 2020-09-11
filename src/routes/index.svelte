<script>
	import {stores} from '@sapper/app';

	import SocialLinks from '../client/ui/SocialLinks.svelte';
	import AccountLoginForm from '../client/ui/AccountLoginForm.svelte';
	import AccountLogoutForm from '../client/ui/AccountLogoutForm.svelte';
	import CreatePersona from '../client/persona/CreatePersona.svelte';
	import PersonaList from '../client/persona/PersonaList.svelte';

	const {session} = stores();
	$: console.log('$session changed', $session); // TODO logging
</script>

<svelte:head>
	<title>Felt</title>
</svelte:head>
<div style="max-width: 640px;">
	<h1>Felt</h1>
	<small>customizable community tools that feel good</small>
	<section>
		{#if $session.account}
			{$session.account.email}
			<AccountLogoutForm />
		{:else}
			<AccountLoginForm />
		{/if}
	</section>
	{#if $session.account}
		<section>
			<CreatePersona {session} />
			<PersonaList personas={$session.personas} />
		</section>
	{/if}
	<ul>
		<li>
			<a href="/about">
				<span>→ learn about Felt ←</span>
				<img src="/logo-heart.png" alt="fuzzy felt heart" style="width: 192px; height: 178px;" />
			</a>
		</li>
		<li>
			<span>source code at</span>
			<a href="https://github.com/feltcoop/felt">github.com/feltcoop/felt</a>
		</li>
		<li><a href="https://felt.social">Felt.social</a> <span>is our service and business</span></li>
		<li><a href="https://felt.dev">Felt.dev</a> <span>is for Felt the free software</span></li>
		<li>
			<SocialLinks />
		</li>
	</ul>
</div>
