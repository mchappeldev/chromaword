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
	<div class="cancel"><a href="/"><GoX /></a></div>
	<div class="innerContainer">
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
		margin-top: 1rem;
		font-weight: 900;
		color: hsl(205, 10%, 50%);
	}
	.signupLink:hover {
		color: hsl(205, 10%, 40%);
	}
	.cancel {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 1.6rem;
		cursor: pointer;
		width: 2rem;
		color: #222;
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
		width: 100%;
		text-align: center;
	}
	.submit {
		background: hsl(205, 68%, 68%);
		border-radius: 0.2rem;
		border: none;
		color: hsl(210, 0%, 100%);
		width: 70%;
		cursor: pointer;
		font-size: 120%;
		font-weight: bold;
		margin-top: 2rem;
		padding: 1rem;
		box-shadow: inset 0 2px 0 hsl(205, 75%, 75%);
		box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
	}
	.emailIcon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1rem;
		height: 1rem;
		color: #888;
		padding: 0;
	}
	.input {
		margin-left: 0.5rem;
		border: 1px solid #aaa;
		background: none;
		outline: none;
		border-radius: 0.2rem;
		background-color: rgba(255, 255, 255, 1);
		font-size: 1rem;
		padding: 0.5rem;
		width: 100%;
	}
	.inputRow {
		margin-top: 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 70%;
	}
	.outerContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
	}
	.innerContainer {
		display: flex;
		justify-content: center;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		background-color: hsl(100, 100%, 100%);
		/* backdrop-filter: blur(2px); */
		box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.2);
		border-radius: 0.3rem;
		width: 400px;
		height: 500px;
		padding: 10px;
	}
	.wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
</style>
