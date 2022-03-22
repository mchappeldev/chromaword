<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';

	import { knownLetters, boardData } from '../store.js';
	import { getBoard } from '../utils/boardGenerator.js';
	import { db } from '../utils/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	$: wordArray = $boardData.wordArray;
	$: answersLetterArray = $boardData.answersLetterArray;

	$knownLetters = [...new Set($boardData.wordArray.map((word) => word.split('')).flat())].filter(
		(letter) => !$boardData.answersLetterArray.includes(letter)
	);

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, 'boards'));
		const allBoards = querySnapshot.docs.map((doc) => doc.data());
		console.log(allBoards[0]);
		console.log($boardData);
		$boardData = allBoards[0];
	});

	// const test = query(collection(db, 'test'), where('state', '==', 'CO'));

	// const query = db.collection('test').where('uid', '==', 'test-doc').orderBy('created');
</script>

<Game />
