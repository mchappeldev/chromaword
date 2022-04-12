// @ts-nocheck
import { supabase, loggedIn, userId } from '../supabase';

import {
	knownLetters,
	boardData,
	selectedColor,
	guesses,
	reviewDifficulty,
	reviewEnjoyment
} from '../../store.js';
import { getBoard } from './boardGenerator.js';

const loadNextBoard = async () => {
	selectedColor.set(7);
	guesses.set(Array(6).fill(''));
	reviewDifficulty.set(0);
	reviewEnjoyment.set(0);

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
		try {
			boardData.set(getBoard());
		} catch (error) {
			if (error != 'debug') throw error;
		}
	}

	knownLetters.set(
		[
			...new Set(
				boardData
					.get()
					.boardWords.map((word) => word.split(''))
					.flat()
			)
		].filter((letter) => !boardData.get().boardAnswers.includes(letter))
	);
};
export default loadNextBoard;
