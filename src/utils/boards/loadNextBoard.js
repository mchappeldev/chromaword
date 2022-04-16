import { supabase, loggedIn, userId } from '../supabase';

import {
	boardData,
	selectedColor,
	guesses,
	reviewDifficulty,
	reviewEnjoyment,
	boardFinished
} from '../../store.js';
import { getBoard } from './boardGenerator.js';
import { goto } from '$app/navigation';

const load = async (boardNumberToLoad) => {
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
				boardData.set({ ...getBoard(), boardId: null });
				boardCreated = true;
			} catch (error) {
				console.error(error);
				// if (error != 'debug') throw error;
			}
		}
	}

	if (boardNumberToLoad) {
		let { data: boards, error } = await supabase
			.from('Boards')
			.select('*')
			.eq('id', boardNumberToLoad);
		if (error) console.error(error);
		if (!boards.length) goto('/');
		boardData.set({
			boardId: boards[0].id,
			boardWords: boards[0].words,
			boardAnswers: boards[0].answers,
			analysis: {}
		});
	} else if (loggedIn()) {
		let { data: boards, error: error1 } = await supabase.from('Boards').select('*');
		if (error1) console.error(error1);
		let { data: boardsComplete, error: error2 } = await supabase
			.from('BoardsComplete')
			.select('*')
			.eq('userId', userId());
		if (error2) console.error(error2);

		const excludeBoards = boardsComplete.map((board) => board.boardId);
		const viableBoards = boards.filter((board) => !excludeBoards.includes(board.id));
		if (viableBoards.length) {
			viableBoards.sort((a, b) => a.id < b.id);
			const board = viableBoards[0];
			boardData.set({
				boardId: board.id,
				boardWords: board.words,
				boardAnswers: board.answers,
				analysis: {}
			});
		} else {
			loadRandomBoard();
		}
	} else {
		loadRandomBoard();
	}
};

export { load };
