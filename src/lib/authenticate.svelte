<script>
	import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
	import FaKey from 'svelte-icons/fa/FaKey.svelte';
	import GoX from 'svelte-icons/go/GoX.svelte';
	import { supabase } from '../utils/supabase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let pageType;
	let email;
	let password;
	let errorMessage = '';
	let infoMessage = '';

	if ($page.url.searchParams.get('status') === 'accountCreatedSuccessfully')
		infoMessage = 'Account created! You can now login!';

	const submit = async () => {
		if (pageType === 'signUp') {
			createAccount();
		} else {
			login();
		}
	};

	const createAccount = async () => {
		if (!email) {
			errorMessage = 'Email is required.';
			return;
		}
		if (!password) {
			errorMessage = 'Password is required.';
			return;
		}

		let { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			errorMessage = error.message.toString();
		} else {
			await goto('/login?status=accountCreatedSuccessfully');
		}
	};

	const login = async () => {
		if (!email) {
			errorMessage = 'Email is required.';
			return;
		}
		if (!password) {
			errorMessage = 'Password is required.';
			return;
		}

		let { error } = await supabase.auth.signIn({ email, password });
		if (error) {
			errorMessage = error.message.toString();
		} else {
			await goto('/');
		}
	};
</script>

<div class="outerContainer">
	<div class="innerContainer">
		<div class="cancel"><a href="/"><GoX /></a></div>
		<div class="wrapper">
			<img src="favicon.png" />
			<div class="header">
				{pageType === 'signUp' ? 'Create an Account' : 'Sign in to Chromaword'}
			</div>
			<div class="inputRow">
				<div class="emailIcon"><FaEnvelope /></div>
				<input class="input" type="email" placeholder="email address" bind:value={email} />
			</div>
			<div class="inputRow">
				<div class="emailIcon"><FaKey /></div>
				<input class="input" type="password" placeholder="password" bind:value={password} />
			</div>
			<div class="messageRow">
				{#if errorMessage}
					<p class="errorMessage">{errorMessage}</p>
				{:else if infoMessage}
					<p class="infoMessage">{infoMessage}</p>
				{/if}
			</div>
			<button on:click={submit} class="submit"
				>{pageType === 'signUp' ? 'Create an Account' : 'Login'}</button
			>
			{#if pageType === 'login'}
				<div class="signupLink"><a href="/signup">Create an account</a></div>
			{/if}
		</div>
	</div>
</div>

<style>
	.signupLink {
		color: hsl(205, 10%, 50%);
		font-weight: 900;
		margin-top: 1rem;
	}
	.signupLink:hover {
		color: hsl(205, 10%, 40%);
	}
	.cancel {
		color: #333;
		cursor: pointer;
		font-size: 1.6rem;
		width: 2rem;
	}
	.messageRow {
		height: 1rem;
	}
	.errorMessage {
		color: red;
	}
	.infoMessage {
		color: blue;
	}
	.header {
		font-size: 24px;
		font-weight: 900;
		margin-top: 15px;
		text-align: center;
		width: 100%;
	}
	.submit {
		background: hsl(205, 68%, 68%);
		border-radius: 0.2rem;
		border: none;
		box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
		box-shadow: inset 0 2px 0 hsl(205, 75%, 75%);
		color: hsl(210, 0%, 100%);
		cursor: pointer;
		font-size: 120%;
		font-weight: bold;
		margin-top: 2rem;
		padding: 1rem;
		width: 70%;
	}
	.emailIcon {
		align-items: center;
		color: #888;
		display: flex;
		height: 1rem;
		justify-content: center;
		padding: 0;
		width: 1rem;
	}
	.input {
		background-color: rgba(255, 255, 255, 1);
		background: none;
		border-radius: 0.2rem;
		border: 1px solid #aaa;
		font-size: 1rem;
		margin-left: 0.5rem;
		outline: none;
		padding: 0.5rem;
		width: 100%;
	}
	.inputRow {
		align-items: center;
		display: flex;
		flex-direction: row;
		margin-top: 2rem;
		width: 70%;
	}
	.outerContainer {
		align-items: center;
		backdrop-filter: blur(2px);
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		height: 100vh;
		justify-content: center;
		width: 100vw;
	}
	.innerContainer {
		align-items: flex-end;
		background-color: hsl(100, 100%, 100%);
		border-radius: 0.3rem;
		box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		height: 500px;
		justify-content: flex-start;
		padding: 10px;
		width: 400px;
	}
	.wrapper {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
</style>
