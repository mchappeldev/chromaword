<script>
	// @ts-nocheck
	import { supabase, loggedIn, userId } from '../supabase';

	import {
		knownLetters,
		boardData,
		selectedColor,
		guesses,
		reviewDifficulty,
		reviewEnjoyment,
		boardFinished
	} from '../../store.js';
	import { getBoard } from './boardGenerator.js';
	import { goto } from '$app/navigation';

	export const load = async (boardNumberToLoad) => {
		selectedColor.set(7);
		guesses.set(Array(6).fill(''));
		reviewDifficulty.set(0);
		reviewEnjoyment.set(0);
		boardFinished.set(false);

		function loadRandomBoard() {
			var executionCount = 0;
			var boardCreated = false;
			while (executionCount < 6 && !boardCreated) {
				executionCount++;
				try {
					boardData.set(getBoard());
					boardCreated = true;
				} catch (error) {
					console.log(error);
					// if (error != 'debug') throw error;
				}
			}
		}

		if (boardNumberToLoad) {
			let { data: boards } = await supabase.from('Boards').select('*').eq('id', boardNumberToLoad);
			if (!boards.length) goto('/');
			boardData.set({
				boardId: boards[0].id,
				boardWords: boards[0].words,
				boardAnswers: boards[0].answers
			});
		} else if (loggedIn()) {
			let { data: boards } = await supabase.from('Boards').select('*').eq('status', 'candidate');
			let { data: boardsComplete } = await supabase
				.from('BoardsComplete')
				.select('*')
				.eq('userId', userId());

			const excludeBoards = boardsComplete.map((board) => board.boardId);
			const viableBoards = boards.filter((board) => !excludeBoards.includes(board.id));
			if (viableBoards.length) {
				viableBoards.sort((a, b) => a.id < b.id);
				const board = viableBoards[0];
				$boardData = { boardId: board.id, boardWords: board.words, boardAnswers: board.answers };
			} else {
				loadRandomBoard();
			}
		} else {
			loadRandomBoard();
		}

		knownLetters.set(
			[...new Set($boardData.boardWords.map((word) => word.split('')).flat())].filter(
				(letter) => !$boardData.boardAnswers.includes(letter)
			)
		);
	};
</script>
