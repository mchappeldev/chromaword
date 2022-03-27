<script>
	import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
	import FaKey from 'svelte-icons/fa/FaKey.svelte';
	import GoX from 'svelte-icons/go/GoX.svelte';
	import supabase from '../utils/supabase';
	import { goto } from '$app/navigation';

	export let pageType;
	let email;
	let password;
	let errorMessage = '';
	let infoMessage = '';

	const submit = async () => {
		if (pageType === 'signUp') {
			createAccount();
		} else {
			login();
		}
	};

	const createAccount = async () => {
		if (password) {
			let { user, error } = await supabase.auth.signUp({ email, password });
			console.log(error);
			console.log(user);
			if (!error && user) {
				await goto('/login');
			}
		} else {
			let { user, error } = await supabase.auth.signIn({ email });
			console.log(user);
		}
	};

	const login = async () => {
		if (password) {
			let { user, error } = await supabase.auth.signIn({ email, password });
			if (error) {
				errorMessage = error.message.toString();
			} else {
				console.log(user);
				await goto('/');
			}
		} else {
			let { user, error } = await supabase.auth.signIn({ email });
			if (error) {
				errorMessage = error.message.toString();
			} else {
				infoMessage = 'A login link has been sent to this email';
			}
		}
	};
</script>

<div class="cancel"><a href="/"><GoX /></a></div>

<div class="outerContainer">
	<div class="innerContainer">
		<div class="header">{pageType === 'signUp' ? 'Create an Account' : 'Login'}</div>
		<div class="inputRow">
			<div class="emailIcon"><FaEnvelope /></div>
			<input class="input" type="email" placeholder="email address" bind:value={email} />
		</div>
		<div class="inputRow">
			<div class="emailIcon"><FaKey /></div>
			<input
				class="input"
				type="password"
				placeholder="password (optional)"
				bind:value={password}
			/>
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

<style>
	.signupLink {
		margin-top: 1rem;
	}
	.cancel {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 1.6rem;
		cursor: pointer;
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
		font-size: 150%;
		font-weight: bold;
		margin-top: 4rem;
	}
	.submit {
		margin-top: 2rem;
		border-radius: 0.2rem;
		font-size: 120%;
		font-weight: bold;
		background: linear-gradient(to right, hsl(120, 70%, 63%), hsl(120, 50%, 70%));
		border: 1px solid rgba(0, 0, 0, 0.2);
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
		padding-left: 0.6rem;
		padding-right: 0.6rem;
		box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.4);
		cursor: pointer;
	}
	.emailIcon {
		width: 1rem;
		height: 1rem;
	}
	.input {
		margin-left: 0.5rem;
		border: none;
		background: none;
		outline: none;
		border-radius: 0.2rem;
		background-color: rgba(255, 255, 255, 0.6);
		box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
		font-size: 110%;
		padding: 0.2rem;
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
		background: linear-gradient(
			to bottom right,
			#e67878,
			#e59978,
			#e5da78,
			#6fcf96,
			#78b7e5,
			#bf7dd6
		);
	}
	.innerContainer {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		background-color: rgba(255, 255, 255, 0.3);
		/* backdrop-filter: blur(2px); */
		box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		width: 400px;
		height: 500px;
	}
</style>
