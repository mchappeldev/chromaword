<script>
	import { supabase } from '../utils/supabase';
	import { goto } from '$app/navigation';
	import GoX from 'svelte-icons/go/GoX.svelte';
	import { onMount } from 'svelte';

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
	let logOff = async () => {
		await supabase.auth.signOut();
		await goto('/login');
	};
	onMount(async () => {
		let { data: BoardsComplete, error } = await supabase
			.from('BoardsComplete')
			.select('*')
			.eq('userId', supabase.auth?.currentUser?.id);
		console.log(BoardsComplete);
		boardsCompleted = BoardsComplete;
	});
</script>

<div class="outerContainer">
	<div class="innerContainer">
		<div class="cancel"><a href="/"><GoX /></a></div>
		<div class="wrapper">
			<div class="header">Profile</div>
			<div class="profile">
				{supabase.auth.currentUser?.email}
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
	</div>
</div>

<style>
	.cancel {
		color: #333;
		cursor: pointer;
		font-size: 1.6rem;
		width: 1.5rem;
	}
	.messageRow {
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
		margin-bottom: 0.5rem;
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
		transition: all 0.25s;
	}
	.input:focus {
		border: 2px solid hsl(205, 68%, 68%);
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

	.forgotPassword {
		font-size: 12px;
		width: 70%;
		color: hsl(205, 10%, 50%);
		font-weight: 900;
		margin-top: 0.25rem;
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
	.statLabel {
	}
	.statsRow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
