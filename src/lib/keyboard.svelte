<script>
	import { guesses, selectedColor, colors, knownLetters } from '../store.js';
	const rows = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['Back', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Submit']
	];
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	$: boardFilled = $guesses.filter((guess) => guess === '').length === 0;
	let shiftDown = false;

	const handlePress = (key, event) => {
		if (key === 'Tab') {
			event?.preventDefault();
			let newColorIndex = $selectedColor + (shiftDown ? -1 : 1);
			if (newColorIndex > 5) {
				$selectedColor = 0;
			} else if (newColorIndex < 0) {
				$selectedColor = 5;
			} else {
				$selectedColor = newColorIndex;
			}
		} else if (key.match(/^[a-z]$/i) && $selectedColor != 7) {
			$guesses[$selectedColor] = key;
		} else if ((key === 'Enter' || key === 'Submit') && boardFilled) {
			dispatch('checkAnswers');
		} else if (key === 'Backspace' || key === 'Back' || key === 'Delete') {
			$guesses[$selectedColor] = '';
		} else if (key === 'Shift') {
			shiftDown = true;
		}
	};
	const handleKeyup = (key) => {
		if (key === 'Shift') {
			shiftDown = false;
		}
	};
</script>

<svelte:window on:keydown={(e) => handlePress(e.key, e)} on:keyup={(e) => handleKeyup(e.key)} />

<div class="keyboard">
	{#each rows as row, i}
		<div class="row" class:middleRow={i === 1}>
			{#each row as key}
				<div
					class="key"
					class:known={$knownLetters.includes(key)}
					class:submit={key === 'Submit'}
					style="--key-color:{$colors[$guesses.indexOf(key)] ?? '#fff'}"
					on:click={() => handlePress(key)}
				>
					{key}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.submit {
		background: linear-gradient(
			to right,
			#e57878 0%,
			#e59978 21.35%,
			#e5da78 40.63%,
			#6fcf96 61.46%,
			#78b7e5 80.73%,
			#bf7dd6 100%
		) !important;
	}
	.keyboard {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 95vw;
		max-width: 350px;
		max-height: 100px;
		min-height: 150px;
		flex-shrink: 3;
		margin-top: 30px;
		gap: 10px;
		padding: 15px;
		border-radius: 10px;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex: 0 1 auto;
		height: 100%;
		gap: 5px;
	}
	.middleRow {
		width: 90%;
	}
	.key {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		background: var(--key-color);
		font-family: 'Open Sans';
		font-weight: 900;
		color: #333;
		border-radius: 3px;
		font-size: 1rem;
		cursor: pointer;
		border: 1px solid #aaa;
		box-shadow: 0px 3px 3px rgba(200, 200, 200, 0.5);
		padding-left: 5px;
		padding-right: 5px;
	}
	.key:active {
		top: 2px;
		box-shadow: 0px 2px 3px rgba(200, 200, 200, 0.7);
	}
	.known {
		background: #ccc;
		color: black;
	}
</style>
