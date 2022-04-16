<script>
	import { supabase } from '../utils/supabase';
	import { goto } from '$app/navigation';
	import GoX from 'svelte-icons/go/GoX.svelte';
	import FaPen from 'svelte-icons/fa/FaPen.svelte';
	import FaUserTag from 'svelte-icons/fa/FaUserTag.svelte';
	import FaUserSecret from 'svelte-icons/fa/FaUserSecret.svelte';
	import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
	import { onMount } from 'svelte';
	import { bind } from 'svelte/internal';
	import { first } from 'lodash';

	// @ts-ignore
	let loggedIn = supabase.auth.currentUser?.aud === 'authenticated';
	let boardsCompleted;
	$: correctBoards = boardsCompleted?.filter((x) => x.success)?.length ?? 0;
	$: failedBoards = boardsCompleted?.filter((x) => !x.success)?.length ?? 0;
	$: winPercentage =
		correctBoards && boardsCompleted?.length ? (correctBoards / boardsCompleted?.length) * 100 : 0;
	$: daysPlayed = boardsCompleted?.length
		? [...new Set(boardsCompleted.map((x) => x.created_at.substring(0, 10)))].length
		: 0;
	let displayName;
	let firstName;
	let lastName;
	let oldName;
	let messageText = '';
	let errorColor;
	let inputDisabled = true;

	// let promise;
	let logOff = async () => {
		await supabase.auth.signOut();
		await goto('/login');
	};

	async function getProfile() {
		let { data: BoardsComplete, error } = await supabase
			.from('BoardsComplete')
			.select('*')
			// @ts-ignore
			.eq('userId', supabase.auth?.currentUser?.id);
		console.log(BoardsComplete);
		boardsCompleted = BoardsComplete;

		let { data: Profile } = await supabase
			.from('Profile')
			.select('*')
			// @ts-ignore
			.eq('userId', supabase.auth?.currentUser?.id)
			.limit(1)
			.single();
		displayName = Profile.displayName;
		oldName = Profile.displayName;
		firstName = Profile.firstName;
		lastName = Profile.lastName;
	}

	const handleProfileUpdate = async () => {
		const { data, error } = await supabase
			.from('Profile')
			.update({ displayName: displayName, firstName: firstName, lastName: lastName })
			.eq('userId', supabase.auth?.currentUser?.id);
		if (error) {
			displayName = oldName;
			console.log(error);
			messageText = 'Something went wrong. Please try again.';
			errorColor = 'red';
		} else {
			messageText = 'Profile updated successfully!';
		}
	};

	let promise = getProfile();
	// onMount(async () => {
	// });
</script>

<div class="outerContainer">
	<div class="innerContainer">
		<div class="cancel"><a href="/"><GoX /></a></div>
		{#await promise}
			<div class="loader">Loading...</div>
		{:then number}
			<div class="wrapper">
				<div class="messageText" style="--textColor: {errorColor ?? 'black'}">{messageText}</div>
				<div class="header">
					<div>Profile</div>
					<div class="svgIcon" on:click={() => (inputDisabled = !inputDisabled)}><FaPen /></div>
				</div>
				<div class="profile">
					<div class="inputRow">
						<div class="svgIcon"><FaUserSecret /></div>
						<input
							maxlength="30"
							type="text"
							size="0"
							disabled={inputDisabled}
							class="displayName"
							bind:value={displayName}
							on:change={handleProfileUpdate}
							placeholder="display name"
						/>
					</div>
					<div class="inputRow">
						<div class="svgIcon"><FaUserTag /></div>
						<input
							maxlength="30"
							type="text"
							size="0"
							disabled={inputDisabled}
							class="displayName inputSmall"
							bind:value={firstName}
							on:change={handleProfileUpdate}
							placeholder="first name"
						/>
						<input
							maxlength="30"
							type="text"
							size="0"
							disabled={inputDisabled}
							class="displayName inputSmall"
							bind:value={lastName}
							on:change={handleProfileUpdate}
							placeholder="last name"
						/>
					</div>
					<div class="inputRow">
						<div class="svgIcon"><FaEnvelope /></div>
						{supabase.auth.currentUser?.email}
					</div>

					<div class="forgotPassword"><a href="/updatePassword">Update Password</a></div>
				</div>
				<div class="header">Stats</div>
				<div class="stats">
					<div class="statsRow">
						<div class="statLabel">Days Played:</div>
						<div class="statItem">{daysPlayed}</div>
					</div>
					<div class="statsRow">
						<div class="statLabel">Boards Attempted:</div>
						<div class="statItem">{boardsCompleted?.length ?? 0}</div>
					</div>
					<div class="statsRow">
						<div class="statLabel">Correct Boards:</div>
						<div class="statItem">{correctBoards}</div>
					</div>
					<div class="statsRow">
						<div class="statLabel">Failed Boards:</div>
						<div class="statItem">{failedBoards}</div>
					</div>
					<div class="statsRow">
						<div class="statLabel">Win Percentage:</div>
						<div class="statItem">{winPercentage.toFixed(2)}%</div>
					</div>
				</div>

				<button on:click={logOff} class="submit">Log Off</button>
			</div>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
</div>

<style>
	/* SPINNER */
	.loader,
	.loader:before,
	.loader:after {
		background: #ffffff;
		-webkit-animation: load1 1s infinite ease-in-out;
		animation: load1 1s infinite ease-in-out;
		width: 1em;
		height: 4em;
	}
	.loader {
		color: #000;
		text-indent: -9999em;
		margin: 88px auto;
		position: relative;
		font-size: 11px;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	.loader:before,
	.loader:after {
		position: absolute;
		top: 0;
		content: '';
	}
	.loader:before {
		left: -1.5em;
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	.loader:after {
		left: 1.5em;
	}
	@-webkit-keyframes load1 {
		0%,
		80%,
		100% {
			box-shadow: 0 0;
			height: 4em;
		}
		40% {
			box-shadow: 0 -2em;
			height: 5em;
		}
	}
	@keyframes load1 {
		0%,
		80%,
		100% {
			box-shadow: 0 0;
			height: 4em;
		}
		40% {
			box-shadow: 0 -2em;
			height: 5em;
		}
	}

	/* SPINNER */
	.cancel {
		color: #333;
		cursor: pointer;
		font-size: 1.6rem;
		width: 1.5rem;
		margin-right: 10px;
		margin-top: 10px;
	}

	.header {
		font-size: 24px;
		font-weight: 900;
		margin-top: 32px;
		text-align: center;
		width: 100%;
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: baseline;
	}

	.submit {
		background: hsl(0, 69%, 69%);
		border-radius: 0.2rem;
		border: none;
		box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
		box-shadow: inset 0 2px 0 hsl(0, 75%, 75%);
		color: hsl(210, 0%, 100%);
		cursor: pointer;
		font-size: 120%;
		font-weight: bold;
		margin-top: 2rem;
		padding: 1rem;
		width: 70%;
		justify-self: flex-end;
	}
	.submit:hover {
		background: hsl(5, 68%, 68%);
		top: -2px;
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
		height: 100vh;
		justify-content: flex-start;
		padding: 10px;
		width: 100vw;
		transition: all 0.25s ease-in-out;
		position: relative;
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
		width: 70%;
		color: hsl(205, 10%, 50%);
		font-weight: 900;
		text-align: center;
		width: 100%;
	}
	.forgotPassword:hover {
		color: hsl(205, 10%, 40%);
	}
	.stats {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		width: 70%;
	}
	.profile {
		display: flex;
		justify-content: left;
		width: 70%;
		flex-direction: column;
	}
	.statItem {
		font-weight: 900;
	}
	.statsRow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.messageText {
		position: absolute;
		top: 50px;
		font-weight: bold;
		color: var(--textColor);
	}

	.displayName:disabled {
		background-color: #ddd;
	}
	.displayName {
		background-color: rgba(255, 255, 255, 1);
		background: none;
		border-radius: 0.2rem;
		border: 2px solid #dfdfdf;
		font-size: 1rem;
		outline: none;
		padding: 0.5rem;
		width: 100%;
		transition: all 0.25s;
		color: #333;
		size: 5;
	}
	.inputSmall {
		width: 40%;
	}
	.svgIcon {
		align-items: center;
		color: #888;
		display: flex;
		height: 1rem;
		justify-content: center;
		margin-left: 10px;
		padding: 0;
		width: 1rem;
		transition: all 0.25s;
	}
	.inputRow {
		align-items: center;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: left;
		margin-top: 10px;
		gap: 10px;
	}
	@media only screen and (min-width: 500px) and (min-height: 650px) {
		.innerContainer {
			width: 400px;
			height: fit-content;
			padding-bottom: 25px;
		}
	}
</style>
