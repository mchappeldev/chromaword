<script>
	import Game from '../lib/game.svelte';

	import { knownLetters, boardData } from '../store.js';
	import { getBoard } from '../utils/boardGenerator.js';

	$boardData = getBoard();
	$: wordArray = $boardData.wordArray;
	$: answersLetterArray = $boardData.answersLetterArray;

	$knownLetters = [...new Set($boardData.wordArray.flat())].filter(
		(letter) => !$boardData.answersLetterArray.includes(letter)
	);
</script>

<Game />
