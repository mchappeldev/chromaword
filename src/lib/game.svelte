<script>
	// @ts-nocheck

	import Keyboard from '$lib/keyboard.svelte';
	import Modal from '$lib/modal.svelte';
	import Board from '$lib/board.svelte';
	import GameComplete from '$lib/gameComplete.svelte';
	import NavBar from '$lib/navBar.svelte';
	// import DailyStatus from '$lib/dailyStatus.svelte';
	import Instructions from '$lib/instructions.svelte';
	import { v4 as newGuid } from 'uuid';
	import { supabase } from '../utils/supabase';
	import { boardData, seenInstructions } from '../store';

	let showGameComplete = false;
	let showInstructions = !$seenInstructions;
	const checkAnswers = async () => {
		showGameComplete = true;
		try {
			const userId = supabase.auth.currentUser?.id;
			var deviceId = localStorage.getItem('deviceId');
			if (!deviceId) {
				deviceId = newGuid();
				localStorage.setItem('deviceId', deviceId);
			}
			const body = { deviceId: deviceId, boardId: $boardData.boardId };
			if (userId) body.userId = userId;
			await fetch('/boardCompleted', {
				method: 'POST',
				body: JSON.stringify(body)
			});
		} catch (error) {}
	};
</script>

<div class="container">
	{#if showGameComplete}
		<Modal bind:visible={showGameComplete}>
			<GameComplete bind:visible={showGameComplete} />
		</Modal>
	{/if}
	{#if showInstructions}
		<Modal bind:visible={showInstructions}>
			<Instructions bind:visible={showInstructions} />
		</Modal>
	{/if}
	<NavBar />
	<!-- <DailyStatus /> -->
	<Board />
	<!-- <button on:click={checkAnswers}>Submit</button> -->
	<Keyboard on:checkAnswers={checkAnswers} />
</div>

<style>
	.container {
		/* justify-content: center; */
		align-items: center;
		background-color: white;
		display: flex;
		flex-direction: column;
		height: 92vh;
		width: 100vw;
	}

	button {
		align-items: center;
		background: linear-gradient(
			90deg,
			#e57878 0%,
			#e59978 21.35%,
			#e5da78 40.63%,
			#6fcf96 61.46%,
			#78b7e5 80.73%,
			#bf7dd6 100%
		);
		border-radius: 5px;
		border: none;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		color: #ffffff;
		cursor: pointer;
		display: flex;
		font-family: 'Open Sans';
		font-size: 24px;
		font-style: normal;
		font-weight: 600;
		height: 40px;
		justify-content: center;
		left: 120px;
		letter-spacing: 0.245em;
		line-height: 100%;
		margin-top: 40px;
		padding: 20px;
		text-align: center;
		text-transform: uppercase;
		top: 549px;
		width: 150px;
	}
</style>
