<script>
	// @ts-nocheck

	import Keyboard from '$lib/keyboard.svelte';
	import Modal from '$lib/modal.svelte';
	import Board from '$lib/board.svelte';
	import GameComplete from '$lib/gameComplete.svelte';
	import NavBar from '$lib/navBar.svelte';
	import DailyStatus from '$lib/dailyStatus.svelte';
	import Instructions from '$lib/instructions.svelte';
	import { v4 as newGuid } from 'uuid';
	import { supabase } from '../utils/supabase';
	import { boardData } from '../store';

	let showGameComplete = false;
	let showInstructions = true;
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
	<NavBar />
	<DailyStatus />
	<Board />
	<!-- <button on:click={checkAnswers}>Submit</button> -->
	<Keyboard on:checkAnswers={checkAnswers} />
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
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		height: 92vh;
		width: 100vw;
		background-color: white;
	}

	button {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		border: none;
		text-align: center;
		letter-spacing: 0.245em;
		text-transform: uppercase;
		margin-top: 40px;
		cursor: pointer;
		color: #ffffff;

		width: 150px;
		height: 40px;
		left: 120px;
		top: 549px;

		background: linear-gradient(
			90deg,
			#e57878 0%,
			#e59978 21.35%,
			#e5da78 40.63%,
			#6fcf96 61.46%,
			#78b7e5 80.73%,
			#bf7dd6 100%
		);
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 5px;
	}
</style>
