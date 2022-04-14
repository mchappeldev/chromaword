<script>
	// @ts-nocheck

	import Keyboard from '$lib/keyboard.svelte';
	import Modal from '$lib/modal.svelte';
	import Board from '$lib/board.svelte';
	import GameComplete from '$lib/gameComplete.svelte';
	import NavBar from '$lib/navBar.svelte';
	import Instructions from '$lib/instructions.svelte';
	import { v4 as newGuid } from 'uuid';
	import { supabase } from '../utils/supabase';
	import { boardData, seenInstructions, guesses, boardFinished } from '../store';

	let showGameComplete = false;
	let showInstructions = !$seenInstructions;
	const checkAnswers = async () => {
		showGameComplete = true;
		try {
			if ($boardFinished) return;
			$boardFinished = true;
			const userId = supabase.auth.currentUser?.id;
			var deviceId = localStorage.getItem('deviceId');
			if (!deviceId) {
				deviceId = newGuid();
				localStorage.setItem('deviceId', deviceId);
			}
			var success = $boardData.boardAnswers.join('') == $guesses.join('').toLowerCase();
			const body = { deviceId: deviceId, boardId: $boardData.boardId, success };
			if (userId) body.userId = userId;
			await fetch('/boardCompleted', {
				method: 'POST',
				body: JSON.stringify(body)
			});
		} catch (error) {}
	};
</script>

<div class="container" data-nosnippet>
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

	{#key $boardData}
		<Board />
	{/key}
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
</style>
