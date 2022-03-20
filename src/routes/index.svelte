<script>
	import Keyboard from '$lib/keyboard.svelte';
	import Modal from '../lib/modal.svelte';
	import { showModal, modalData, guesses, answers, wordArray } from '../store.js';
	import Board from '../lib/board.svelte';
	import GameComplete from '../lib/gameComplete.svelte';

	const checkAnswers = () => {
		if ($answers.join('') == $guesses.join('').toLowerCase()) {
			modalData.set({
				header: 'You won!',
				message: `You correctly guessed the following: ${answers}`
			});
			showModal.set(!$showModal);
		} else {
			modalData.set({
				header: 'You Failed!',
				message: `You guessed the following: ${$guesses} and it was actually: ${answers}! The words were ${$wordArray.map(
					(x) => x.join('')
				)}`
			});
			showModal.set(!$showModal);
		}
	};
</script>

<div class="container">
	<h1>ChromaWord</h1>
	<Board />
	<button on:click={checkAnswers}>Submit</button>
	<Keyboard />
	{#if $showModal}
		<Modal />
	{/if}
</div>
<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
		@import url('https://fonts.googleapis.com/css2?family=Pavanam&display=swap');
		@import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
		body {
			font-family: 'Open Sans', sans-serif;
		}
	</style>
</svelte:head>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: white;
	}

	h1 {
		width: 390px;
		height: 50px;
		left: 0px;
		top: 44px;

		font-family: 'Passion One';
		font-style: normal;
		font-weight: 400;
		font-size: 48px;
		line-height: 53px;
		text-align: center;
		text-transform: uppercase;

		background: linear-gradient(
			90deg,
			#e57878 24.62%,
			#e59978 34.09%,
			#e5da78 44.08%,
			#6fcf96 54.34%,
			#78b7e5 64.34%,
			#bf7dd6 75.13%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	button {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 400;
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
		border-radius: 11px;
	}
</style>
