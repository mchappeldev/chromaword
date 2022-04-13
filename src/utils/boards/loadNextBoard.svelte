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

	export const load = async () => {
		selectedColor.set(7);
		guesses.set(Array(6).fill(''));
		reviewDifficulty.set(0);
		reviewEnjoyment.set(0);
		boardFinished.set(false);

		if (loggedIn()) {
			let { data: boards } = await supabase.from('Boards').select('*').eq('status', 'candidate');
			let { data: boardsComplete } = await supabase
				.from('BoardsComplete')
				.select('*')
				.eq('userId', userId());

			const excludeBoards = boardsComplete.map((board) => board.boardId);
			const viableBoards = boards.filter((board) => !excludeBoards.includes(board.id));
			viableBoards.sort((a, b) => a.id < b.id);
			const board = viableBoards[0];
			// $boardData = { boardId: board.id, boardWords: board.words, boardAnswers: board.answers };
			boardData.set({ boardId: board.id, boardWords: board.words, boardAnswers: board.answers });
		} else {
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

		knownLetters.set(
			[...new Set($boardData.boardWords.map((word) => word.split('')).flat())].filter(
				(letter) => !$boardData.boardAnswers.includes(letter)
			)
		);
	};
</script>
