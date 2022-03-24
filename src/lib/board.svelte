<script>
	import { guesses, selectedColor, colors, boardData } from '../store.js';

	$: boardWords = $boardData.boardWords;
	$: boardAnswers = $boardData.boardAnswers;

	const selectGuessable = (letter) => {
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
						style="--tile-color: {$colors[boardAnswers.indexOf(letter)] ?? $colors[6]}"
					>
						{$guesses[boardAnswers.indexOf(letter)]}
					</div>
				{:else}
					<div
						class="tile"
						style="--tile-color: {$colors[boardAnswers.indexOf(letter)] ?? $colors[6]}"
					>
						{letter}
					</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

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
		transition: all 0.25s ease-in-out;
		user-select: none;
	}
	.tile:before {
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
	.tile:after {
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
