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
		align-items: center;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		flex-shrink: 3;
		gap: 10px;
		justify-content: space-between;
		margin-top: 30px;
		max-height: 100px;
		max-width: 350px;
		min-height: 150px;
		padding: 15px;
		width: 95vw;
	}

	.row {
		align-items: center;
		display: flex;
		flex-direction: row;
		flex: 0 1 auto;
		gap: 5px;
		height: 100%;
		justify-content: center;
		width: 100%;
	}

	.middleRow {
		width: 90%;
	}

	.key {
		align-items: center;
		background: var(--key-color);
		border-radius: 3px;
		border: 1px solid #aaa;
		box-shadow: 0px 3px 3px rgba(200, 200, 200, 0.5);
		color: #333;
		cursor: pointer;
		display: flex;
		font-family: 'Open Sans';
		font-size: 1rem;
		font-weight: 900;
		height: 100%;
		justify-content: center;
		padding-left: 5px;
		padding-right: 5px;
		position: relative;
		width: 100%;
	}

	.key:active {
		box-shadow: 0px 2px 3px rgba(200, 200, 200, 0.7);
		top: 2px;
	}

	.known {
		background: #ccc;
		color: black;
	}
</style>
