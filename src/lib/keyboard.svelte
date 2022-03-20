<script>
	import { prevent_default } from 'svelte/internal';

	import {
		guesses,
		variance,
		wordArray,
		answers,
		selectedColor,
		colors,
		knownLetters
	} from '../store.js';
	const rows = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['Tab', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Back']
	];
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	$: boardFilled = $guesses.filter((guess) => guess === '').length === 0;

	const handlePress = (key, event) => {
		if (key === 'Tab' && $selectedColor < 5) {
			event?.preventDefault();
			$selectedColor = $selectedColor + 1;
		} else if (key === 'Tab' && ($selectedColor === 5 || $selectedColor === 7)) {
			event?.preventDefault();
			$selectedColor = 0;
		} else if (key.match(/^[a-z]$/i)) {
			$guesses[$selectedColor] = key;
		} else if (key === 'Enter' && boardFilled) {
			dispatch('checkAnswers');
		} else if (key === 'Backspace' || key === 'Back') {
			$guesses[$selectedColor] = '';
		}
	};
</script>

<svelte:window on:keydown={(e) => handlePress(e.key, e)} />

<div class="keyboard">
	{#each rows as row, i}
		<div class="row" class:middleRow={i === 1}>
			{#each row as key}
				<div
					class="key"
					class:known={$knownLetters.includes(key)}
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
	.keyboard {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 95vw;
		max-width: 350px;
		max-height: 200px;
		height: 40vw;
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
		font-size: 1.5vh;
		cursor: pointer;
		border: 1px solid #aaa;
		box-shadow: 0px 3px 3px rgba(200, 200, 200, 0.5);
		padding-left: 5px;
		padding-right: 5px;
	}
	.known {
		background: #ccc;
		color: black;
	}
</style>
