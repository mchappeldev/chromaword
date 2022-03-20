<script>
	import { get } from 'svelte/store';
	import Modal from '../lib/modal.svelte';
	import { showModal, modalData, guesses, variance } from '../store.js';
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
	const colors = ['#E67878', '#E59978', '#E5DA78', '#6FCF96', '#78B7E5', '#BF7DD6','#A9A9A9'];
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
	<h1>Svelte Word</h1>
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
						class="tile"
						bind:clientHeight={tileHeight}
						style="font-size: {tileHeight * 0.5}px; --tile-color: {colors[answers.indexOf(letter)] ?? colors[6]}"
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
	<div>{$variance}</div>
</div>

{#if $showModal}
	<Modal />
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
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
/* identical to box height, or 24px */
border: none;
text-align: center;
letter-spacing: 0.245em;
text-transform: uppercase;

color: #FFFFFF;

width: 150px;
height: 40px;
left: 120px;
top: 549px;

background: linear-gradient(90deg, #E57878 0%, #E59978 21.35%, #E5DA78 40.63%, #6FCF96 61.46%, #78B7E5 80.73%, #BF7DD6 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 11px;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: white;
	}
	.board {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 15px;
		height: 100%;
		width: 100%;
		max-height: 60vh;
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
		color: white;
		background-color: var(--tile-color);
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		transition: top .25s ease-in-out;
		border-radius: 5px;
	}
	.tile:before {
  content: '';
  position: absolute;
  top:3px;
  left: -3px;
  height:98%;
  width:5px;
  background: var(--tile-color);
  filter: brightness(85%);
  transform: .5s;
  transform: rotate(0deg) skewY(-45deg);
 
}
.tile:after {
  content: '';
  position: absolute;
  bottom:-4px;
  left:-1px;
  height:5px;
  width:98%;
  background: var(--tile-color);
  transform: .5s;
  filter: brightness(75%);
  transform: rotate(0deg) skewX(-45deg);
}
.tile:hover {
  top:-10px;
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

background: linear-gradient(90deg, #E57878 24.62%, #E59978 34.09%, #E5DA78 44.08%, #6FCF96 54.34%, #78B7E5 64.34%, #BF7DD6 75.13%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

		}
</style>
