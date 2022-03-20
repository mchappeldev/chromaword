<script>
	import { get } from 'svelte/store';
	import Modal from '../lib/modal.svelte';
	import { showModal, modalData, guesses, variance, wordArray, answers } from '../store.js';
	import { getBoard, getRandom, selectAnswers, getWords } from '../utils/boardGenerator.js';
	import ColorSelector from './colorPicker.svelte';

	let boardHeight;
	let tileHeight;
	let rows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
	let columns = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
	const boardData = getBoard();
	answers.set(boardData.answers);
	wordArray.set(boardData.wordArray);

	// const { wordArray } = board;
	const uniqueLetters = [...new Set($wordArray.flat().join(''))];
	// const answers = getRandom(uniqueLetters, 6);
	const colors = ['#E67878', '#E59978', '#E5DA78', '#6FCF96', '#78B7E5', '#BF7DD6', '#A9A9A9']; // red, orange, yellow, green, blue, purple, grey
	let guess1 = '';
</script>

<div class="board">
	{#each $wordArray as word}
		<div class="row">
			{#each word as letter}
				<div class="tile" style="--tile-color: {colors[$answers.indexOf(letter)] ?? colors[6]}">
					<!-- {#if !answers.includes(letter)}{letter}{/if} -->
					{#if $answers.includes(letter)}
						{$guesses[$answers.indexOf(letter)]}
					{:else}
						{letter}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
<!-- <input class="tile" type="text" bind:value={$guesses[1]} /> -->

<!-- <div>{$variance}</div> -->
<style>
	.board {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 15px;
		max-height: calc(300px * 1.25);
		max-width: calc(250px * 1.25);
		height: min(calc(6 / 5 * 80vw), calc(6 / 5 * 35vh));
		width: min(80vw, 35vh);
	}
	.row {
		display: flex;
		justify-content: center;
		gap: 10px;
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
		background-color: hsl(0, 0%, 57%);
		box-sizing: border-box;
		text-transform: uppercase;
		font-family: 'Open Sans';
		font-weight: 900;
		font-size: 150%;
		color: white;
		background-color: var(--tile-color);
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		transition: top 0.25s ease-in-out;
	}
	.tile:before {
		content: '';
		position: absolute;
		top: 0.16vh;
		left: -3px;
		height: 100%;
		width: 5px;
		background: var(--tile-color);
		filter: brightness(85%);
		transform: 0.5s;
		transform: rotate(0deg) skewY(-45deg);
	}
	.tile:after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: -1px;
		height: 5px;
		width: 100%;
		background: var(--tile-color);
		transform: 0.5s;
		filter: brightness(75%);
		transform: rotate(0deg) skewX(-45deg);
	}
	.tile:hover {
		top: -10px;
	}
</style>
