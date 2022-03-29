<script>
	// @ts-nocheck

	import { supabase, loggedIn, userId } from '../utils/supabase';
	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';

	import { knownLetters, boardData } from '../store.js';

	$knownLetters = [...new Set($boardData.boardWords.map((word) => word.split('')).flat())].filter(
		(letter) => !$boardData.boardAnswers.includes(letter)
	);

	onMount(async () => {
		let { data: boards } = await supabase.from('Boards').select('*').eq('status', 'candidate');
		let { data: boardsComplete } = await supabase
			.from('BoardsComplete')
			.select('*')
			.eq('userId', userId());

		const excludeBoards = boardsComplete.map((board) => board.boardId);
		const viableBoards = boards.filter((board) => !excludeBoards.includes(board.id));
		viableBoards.sort((a, b) => a.id < b.id);
		const board = viableBoards[0];
		$boardData = { boardId: board.id, boardWords: board.words, boardAnswers: board.answers };
	});
</script>

<Game />
