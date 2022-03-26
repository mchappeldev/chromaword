<script>
	// @ts-nocheck

	// import { createClient } from '@supabase/supabase-js';

	// const supabaseUrl = 'https://izquajbrfmtjxoxgytor.supabase.co';
	// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
	// const supabase = createClient(supabaseUrl, supabaseKey);

	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';

	import { knownLetters, boardData } from '../store.js';
	import { getBoard } from '../utils/boards/boardGenerator.js';

	try {
		$boardData = getBoard();
	} catch (error) {
		if (error != 'debug') throw error;
	}

	$knownLetters = [...new Set($boardData.boardWords.map((word) => word.split('')).flat())].filter(
		(letter) => !$boardData.boardAnswers.includes(letter)
	);

	onMount(async () => {
		// const { data } = await supabase
		// 	.from('Boards')
		// 	.insert([{ words: $boardData.boardWords, answers: $boardData.boardAnswers }]);
		// let { data: Boards } = await supabase.from('Boards').select('*');
		// console.log(Boards);
	});
</script>

<Game />
