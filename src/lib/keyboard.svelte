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
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back']
	];
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	$: boardFilled = $guesses.filter((guess) => guess === '').length === 0;

	const handlePress = (key, event) => {
		if (key === 'Tab' && $selectedColor < 5) {
			event.preventDefault();
			$selectedColor = $selectedColor + 1;
		} else if (key === 'Tab' && $selectedColor === 5) {
			event.preventDefault();
			$selectedColor = 0;
		} else if (key.match(/^[a-z]$/i)) {
			$guesses[$selectedColor] = key;
		} else if (key === 'Enter' && boardFilled) {
			dispatch('checkAnswers');
		}
	};
</script>

<svelte:window on:keydown={(e) => handlePress(e.key, e)} />

<div class="keyboard">
	{#each rows as row}
		<div class="row">
			{#each row as key}
				<div
					class="key"
					class:known={$knownLetters.includes(key)}
					style="--key-color:{$colors[$guesses.indexOf(key)] ?? $colors[6]}"
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
		color: white;
		border-radius: 5px;
		text-transform: uppercase;
		font-size: 1.5vh;
		cursor: pointer;
	}
	.known {
		background: #797979;
	}
</style>
