<script>
	import { getBoard } from '../utils/boards/boardGenerator.js';
	import { knownLetters, boardData, guesses } from '../store.js';
	import Game from '../lib/game.svelte';
	import { supabase } from '../utils/supabase';

	let boards = [];
	let showBoard = false;
	const createNewBoard = () => {
		const board = getBoard();
		boards = [...boards, board];
		// boards.push(board);
	};

	const saveAllBoards = async () => {
		const boardsToSave = boards.map((board) => {
			return {
				answers: board.boardAnswers,
				words: board.boardWords,
				...board.analysis
			};
		});
		await supabase.from('Boards').insert(boardsToSave);
	};

	const playBoard = (boardIndex) => {
		$boardData = boards[boardIndex];
		$knownLetters = [...new Set($boardData.boardWords.map((word) => word.split('')).flat())].filter(
			(letter) => !$boardData.boardAnswers.includes(letter)
		);
		$guesses = Array(6).fill('');
		showBoard = true;
	};
</script>

{#if !showBoard}
	<button on:click={() => createNewBoard()}>Create</button>
	<button on:click={() => saveAllBoards()}>Save All</button>

	<div class="container">
		<table class="table">
			<tr>
				<th class="cell headerCell">ID</th>
				<th class="cell headerCell">Max Difficulty</th>
				<th class="cell headerCell">Cumulative Difficulty</th>
				<th class="cell headerCell">Letters Hidden</th>
				<th class="cell headerCell">One Letter Rows</th>
				<th class="cell headerCell">Play</th>
			</tr>
			{#each boards as board, i}
				<tr class="dataRow">
					<td class="cell dataCell">{i}</td>
					<td class="cell dataCell">{board.analysis.maxGuessDifficulty}</td>
					<td class="cell dataCell">{board.analysis.cumulativeGuessDifficulty}</td>
					<td class="cell dataCell">{board.analysis.lettersHidden}</td>
					<td class="cell dataCell">{board.analysis.oneLetterRows}</td>
					<td on:click={() => playBoard(i)} class="cell dataCell play">Play</td>
				</tr>
			{/each}
		</table>
	</div>
{:else}
	<button on:click={() => (showBoard = false)}>Return</button>
	<Game />
{/if}

<style>
	.table {
		border-collapse: collapse;
	}
	.container {
		height: 100vh;
		width: 100vw;
	}
	.cell {
		min-width: 150px;
		border: 1px solid black;
	}
	.play {
		color: blue;
		text-align: center;
		cursor: pointer;
		font-weight: bold;
	}
</style>
