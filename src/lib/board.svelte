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
						{$guesses[boardAnswers.indexOf(letter)]}
					</div>
				{:else}
					<div
						class="tile"
						class:shake={$guesses.includes(letter) && ready}
						style="--tile-color: {$colors[boardAnswers.indexOf(letter)] ??
							$colors[6]}; --translate-height:0px"
					>
						{letter}
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 15px;
		max-height: calc(300px * 1.25);
		max-width: calc(250px * 1.25);
		height: min(calc(6 / 5 * 80vw), calc(6 / 5 * 35vh));
		width: min(80vw, 35vh);
		margin-top: 1rem;
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
		position: relative;
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
		transition: all 0.25s ease-in-out;
		user-select: none;
	}
	.tile::before {
		content: '';
		position: absolute;
		top: 2.25px;
		left: -4.75px;
		height: 100%;
		width: 5px;
		background: var(--tile-color);
		filter: brightness(85%);
		transform: 0.5s;
		transform: rotate(0deg) skewY(-45deg);
	}
	.tile::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: -2.5px;
		height: 5px;
		width: 100%;
		background: var(--tile-color);
		transform: 0.5s;
		filter: brightness(75%);
		transform: rotate(0deg) skewX(-45deg);
	}
	.guessable {
		cursor: pointer;
	}
	.selected {
		transform: translateY(-5px);
		filter: brightness(110%) drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25));
	}
</style>
