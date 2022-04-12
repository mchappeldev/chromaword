<script>
	import { tick } from 'svelte';
	import { guesses, selectedColor, colors, boardData, knownLetters } from '../store.js';

	let ready;
	$: boardWords = $boardData.boardWords;
	$: boardAnswers = $boardData.boardAnswers;
	$: duplicates = $guesses
		.filter((letter, index) => index !== $guesses.indexOf(letter))
		.join('')
		.split('');

	//this deserves a comment to explain
	$: {
		$guesses = $guesses;
		ready = false;
		setTimeout(() => {
			ready = true;
		}, 1);
	}

	const selectGuessable = (letter) => {
		ready = true;
		selectedColor.set(boardAnswers.indexOf(letter));
	};
</script>

<div class="board">
	{#each boardWords as word}
		<div class="row">
			{#each word.split('') as letter}
				{#if boardAnswers.includes(letter)}
					<div
						on:click={() => selectGuessable(letter)}
						class="tile guessable"
						class:selected={$selectedColor === boardAnswers.indexOf(letter)}
						class:shake={$knownLetters
							.concat(duplicates)
							.includes($guesses[boardAnswers.indexOf(letter)]) && ready}
						style="--tile-color: {$colors[boardAnswers.indexOf(letter)] ??
							$colors[6]}; --translate-height: {$selectedColor === boardAnswers.indexOf(letter)
							? '-5px'
							: '0px'}"
					>
						<div class="tileSide" />
						{$guesses[boardAnswers.indexOf(letter)]}
						<div class="tileBottom" />
					</div>
				{:else}
					<div
						class="tile"
						class:shake={$guesses.includes(letter) && ready}
						style="--tile-color: {$colors[boardAnswers.indexOf(letter)] ??
							$colors[6]}; --translate-height:0px"
					>
						<div class="tileSide" />
						{letter}
						<div class="tileBottom" />
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<!-- <div on:click={tileReflow}>GO TIME</div> -->
<style>
	.shake {
		animation-name: shake;
		animation-duration: 0.25s;
		animation-iteration-count: 2;
		transition: 0.25s ease-in-out;
		animation-timing-function: ease-out;
	}

	@keyframes shake {
		from {
			transform: rotate(0deg) translateY(var(--translate-height));
		}
		33% {
			transform: rotate(5deg) translateY(var(--translate-height));
		}
		66% {
			transform: rotate(-5deg) translateY(var(--translate-height));
		}
		to {
			transform: rotate(0deg) translateY(var(--translate-height));
		}
	}

	.board {
		/* margin-top: 1rem; */
		display: flex;
		flex-direction: column;
		gap: 15px;
		justify-content: center;
		margin: auto;
		margin: auto;
	}
	.row {
		display: flex;
		gap: 10px;
		height: 100%;
		justify-content: center;
		max-height: 100px;
		width: 100%;
	}
	.tile {
		-webkit-tap-highlight-color: transparent;
		-webkit-transform: translate3d(0, 0, 0);
		align-items: center;
		background-color: hsl(0, 0%, 57%);
		background-color: var(--tile-color);
		box-sizing: border-box;
		color: white;
		display: flex;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		font-family: 'Open Sans';
		font-size: 1.5rem;
		font-weight: 900;
		height: 38px;
		justify-content: center;
		position: relative;
		text-transform: uppercase;
		transition: all 0.25s ease-in-out;
		user-select: none;
		width: 38px;
	}
	.tileSide {
		background: var(--tile-color);
		content: '';
		filter: brightness(85%);
		height: 100%;
		left: -4.75px;
		position: absolute;
		top: 2.25px;
		transform: 0.5s;
		transform: rotate(0deg) skewY(-45deg);
		width: 5px;
	}
	.tileBottom {
		background: var(--tile-color);
		bottom: -5px;
		content: '';
		filter: brightness(75%);
		height: 5px;
		left: -2.5px;
		position: absolute;
		transform: 0.5s;
		transform: rotate(0deg) skewX(-45deg);
		width: 100%;
	}
	.guessable {
		cursor: pointer;
	}
	.selected {
		filter: brightness(105%) drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
		transform: translateY(-5px);
	}

	@media only screen and (min-width: 400px) and (min-height: 650px) {
		.tile {
			font-size: 1.75rem;
			height: 45px !important;
			width: 45px !important;
		}
	}

	@media only screen and (min-width: 750px) and (min-height: 750px) {
		.tile {
			font-size: 2rem;
			height: 60px !important;
			width: 60px !important;
		}
	}
</style>
