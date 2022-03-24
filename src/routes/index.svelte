<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';

	import { knownLetters, boardData } from '../store.js';
	import { getBoard } from '../utils/boards/boardGenerator.js';
	import { db } from '../utils/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	$boardData = getBoard();
	$: boardWords = $boardData.boardWords;
	$: boardAnswers = $boardData.boardAnswers;

	$knownLetters = [...new Set($boardData.boardWords.map((word) => word.split('')).flat())].filter(
		(letter) => !$boardData.boardAnswers.includes(letter)
	);

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, 'test'));
		const test3 = querySnapshot.docs.map((doc) => doc.data());
		// console.log(test3);
	});

	// const test = query(collection(db, 'test'), where('state', '==', 'CO'));

	// const query = db.collection('test').where('uid', '==', 'test-doc').orderBy('created');
</script>

<Game />
