<script>
	import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
	import FaKey from 'svelte-icons/fa/FaKey.svelte';
	import GoX from 'svelte-icons/go/GoX.svelte';
	import FaUserTag from 'svelte-icons/fa/FaUserTag.svelte';
	import FaUserSecret from 'svelte-icons/fa/FaUserSecret.svelte';
	import { supabase } from '../utils/supabase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	export let pageType;
	let email;
	let password;
	let firstName;
	let lastName;
	let errorMessage = '';
	let infoMessage = '';
	let buttonText;
	let headerText;
	let showEmailInput = true;
	let showPasswordInput = true;
	let showNameInput = false;
	let submitHandler;
	let displayName;

	switch (pageType) {
		case 'login':
			headerText = 'Sign in to Chromaword';
			buttonText = 'Login';
			submitHandler = login;
			break;
		case 'signUp':
			headerText = 'Create an Account';
			buttonText = 'Create';
			submitHandler = createAccount;
			showNameInput = true;
			break;
		case 'forgotPassword':
			headerText = 'Reset your Password';
			buttonText = 'Recover';
			submitHandler = resetPassword;
			showPasswordInput = false;
			break;
		case 'updatePassword':
			headerText = 'Set a new Password';
			buttonText = 'Update';
			submitHandler = updatePassword;
			showEmailInput = false;
			break;
		default:
			break;
	}

	if ($page.url.searchParams.get('status') === 'accountCreatedSuccessfully')
		infoMessage = 'Account created! You can now login!';
	if ($page.url.searchParams.get('status') === 'resetLinkSent')
		infoMessage = 'Check your email for a password reset link!';

	async function login() {
		if (!email || !password) {
			errorMessage = 'All fields are required.';
			return;
		}

		let { user, error } = await supabase.auth.signIn({ email, password });
		if (error) {
			errorMessage = error.message.toString();
		} else {
			await syncDeviceRecordsWithUserId(user.id);
			await goto('/');
		}
	}

	async function createAccount() {
		if (!email || !password || !firstName || !lastName || !displayName) {
			errorMessage = 'All fields are required.';
			return;
		}

		let { user, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			errorMessage = error.message.toString();
		} else {
			await supabase
				.from('Profile')
				.insert([{ userId: user.id, firstName, lastName, displayName }]);
			await syncDeviceRecordsWithUserId(user.id);
			await goto('/login?status=accountCreatedSuccessfully');
		}
	}

	async function resetPassword() {
		if (!email) {
			errorMessage = 'Email is required.';
			return;
		}
		let { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
			redirectTo: 'https://chromaword.com/updatePassword'
		});
		if (error) {
			errorMessage = error.message.toString();
		} else {
			await goto('/login?status=resetLinkSent');
		}
	}

	async function updatePassword() {
		console.log('');
		if (!supabase?.auth?.currentUser?.email) return;
		const { user, error } = await supabase.auth.update({
			email: supabase.auth.currentUser.email,
			password
		});
		if (error) {
			errorMessage = error.message.toString();
		} else {
			await goto('/');
		}
	}

	/* 
		When you're not logged in, we don't know which user you are and therefore can't associate your activities with
		your userId. We can and do associate them with the deviceId you're using though. Once you login, we need to
		update the db records that are only tied to your deviceId so that they include your userId as well. This prevents
		you from having to replay boards you already completed.
	*/
	async function syncDeviceRecordsWithUserId(userId) {
		if (browser)
			await supabase
				.from('BoardsComplete')
				.update({ userId: userId })
				.eq('deviceId', localStorage.getItem('deviceId'));
	}
</script>

<div class="outerContainer">
	<div class="innerContainer">
		<div class="cancel"><a href="/"><GoX /></a></div>
		<form on:submit|preventDefault={submitHandler} class="wrapper">
			<img src="favicon.png" />
			<div class="header">
				{headerText}
			</div>
			{#if showNameInput}
				<div class="inputRow">
					<div class="svgIcon"><FaUserSecret /></div>
					<input
						class="input"
						maxlength="30"
						type="text"
						placeholder="display name"
						bind:value={displayName}
					/>
				</div>
				<div class="inputRow">
					<div class="svgIcon"><FaUserTag /></div>
					<input
						maxlength="30"
						class="input inputSmall"
						type="text"
						placeholder="first name"
						bind:value={firstName}
					/>
					<input
						maxlength="30"
						class="input inputSmall"
						type="text"
						placeholder="last name"
						bind:value={lastName}
					/>
				</div>
			{/if}
			{#if showEmailInput}
				<div class="inputRow">
					<div class="svgIcon"><FaEnvelope /></div>
					<input class="input" type="email" placeholder="email address" bind:value={email} />
				</div>
			{/if}
			{#if showPasswordInput}
				<div class="inputRow">
					<div class="svgIcon"><FaKey /></div>
					<input class="input" type="password" placeholder="password" bind:value={password} />
				</div>
			{/if}

			{#if pageType === 'login'}
				<div class="forgotPassword"><a href="/forgotPassword">Forgot password?</a></div>
			{/if}
			<div class="messageRow">
				{#if errorMessage}
					<p class="errorMessage">{errorMessage}</p>
				{:else if infoMessage}
					<p class="infoMessage">{infoMessage}</p>
				{/if}
			</div>
			<button type="submit" class="submit">{buttonText}</button>
			{#if pageType === 'login'}
				<div class="signupLink"><a href="/signup">Create an account</a></div>
			{/if}
		</form>
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
		width: 1.5rem;
		margin: 10px;
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
		margin-bottom: 1rem;
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
	.submit:hover {
		background: hsl(210, 68%, 68%);
		top: -2px;
	}
	.svgIcon {
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
		border: 2px solid #dfdfdf;
		font-size: 1rem;
		margin-left: 0.5rem;
		outline: none;
		padding: 0.5rem;
		width: 100%;
		transition: all 0.25s;
	}
	.inputSmall {
		width: 40%;
	}
	.input:focus {
		border: 2px solid hsl(205, 68%, 68%);
		/* margin: -1px -1px -1px 0.5rem; */
	}
	.inputRow {
		align-items: center;
		display: flex;
		flex-direction: row;
		width: 70%;
		margin-top: 1.5rem;
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
		width: 100vw;
		height: 100vh;
		justify-content: flex-start;
		padding: 10px;
		transition: all 0.25s ease-in-out;
	}
	.wrapper {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}

	.forgotPassword {
		font-size: 12px;
		text-align: right;
		width: 70%;
		color: hsl(205, 10%, 50%);
		font-weight: 900;
		margin-top: 0.25rem;
	}
	.forgotPassword:hover {
		color: hsl(205, 10%, 40%);
	}

	@media only screen and (min-width: 500px) and (min-height: 650px) {
		.innerContainer {
			width: 400px;
			height: 570px;
		}
	}
</style>
