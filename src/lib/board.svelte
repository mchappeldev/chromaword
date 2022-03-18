<script>
	import { get } from 'svelte/store';
	import Modal from '../lib/modal.svelte';
	import { showModal, modalData, guesses } from '../store.js';
	import { getBoard, getRandom, selectAnswers, getWords } from '../utils/boardGenerator.js';
	import ColorSelector from './colorPicker.svelte';

	let boardHeight;
	let tileHeight;
	let rows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
	let columns = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
	const { wordArray, answers } = getBoard();
	// const { wordArray } = board;
	const uniqueLetters = [...new Set(wordArray.flat().join(''))];
	// const answers = getRandom(uniqueLetters, 6);
	const colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
	let guess1 = '';

	const checkAnswers = () => {
		console.log(answers);
		console.log($guesses);
		console.log(wordArray);

		if (answers.join('') == $guesses.join('').toLowerCase()) {
			modalData.set({
				header: 'You won!',
				message: `You correctly guessed the following: ${answers}`
			});
			showModal.set(!$showModal);
		} else {
			modalData.set({
				header: 'You Failed!',
				message: `You guessed the following: ${$guesses} and it was actually: ${answers}! The words were ${wordArray.map(
					(x) => x.join('')
				)}`
			});
			showModal.set(!$showModal);
		}
	};
</script>

<div class="container">
	<div
		class="board"
		bind:clientHeight={boardHeight}
		style="width: {boardHeight * (columns.length / rows.length)}px"
	>
		<!-- <button
			on:click={() => {
				modalData.set({
					header: 'This is a header',
					message:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab odit modi a quibusdam alias nesciunt beatae, voluptates impedit ex, eum est accusantium quia doloremque nemo!'
				});
				showModal.set(!$showModal);
			}}>Toggle Modal</button
		> -->
		{#each wordArray as word}
			<div class="row">
				{#each word as letter}
					<div
						class="tile {colors[answers.indexOf(letter)] ?? ''}"
						bind:clientHeight={tileHeight}
						style="font-size: {tileHeight * 0.5}px;"
					>
						<!-- {#if !answers.includes(letter)}{letter}{/if} -->
						{#if answers.includes(letter)}
							{$guesses[answers.indexOf(letter)]}
						{:else}
							{letter}
						{/if}
					</div>
				{/each}
			</div>
		{/each}
		
	</div>
	<!-- <input class="tile" type="text" bind:value={$guesses[1]} /> -->
	<ColorSelector />
	<button on:click={checkAnswers}>Submit</button>
</div>

{#if $showModal}
	<Modal />
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: #ddd;
	}
	.board {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		height: 100%;
		width: 100%;
		max-height: 60vh;
	}
	.row {
		display: flex;
		justify-content: center;
		gap: 5px;
		max-height: 100px;
		height: 100%;
		width: 100%;
	}
	.tile {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		max-width: 100px;
		max-height: 100px;
		background-color: #fff;
		border: 2px solid #777;
		box-sizing: border-box;
		text-transform: uppercase;
		font-family: 'Open Sans';
		font-weight: 900;
		color: #333;
	}
	.color1 {
		/* background-color: hsl(0, 100%, 100%); */
		background-color: rgb(255, 0, 0);
	}
	.color2 {
		background-color: rgb(255, 128, 0);
	}
	.color3 {
		background-color: rgb(255, 255, 0);
	}
	.color4 {
		background-color: rgb(0, 255, 0);
	}
	.color5 {
		background-color: rgb(0, 0, 255);
	}
	.color6 {
		background-color: rgb(149, 0, 255);
	}

	.hideText {
		visibility: hidden;
	}
</style>
