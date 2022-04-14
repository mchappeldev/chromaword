<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';
	import { boardData } from '../store.js';
	import { db } from '../utils/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, 'boards'));
		const allBoards = querySnapshot.docs.map((doc) => doc.data());
		// console.log(allBoards[0]);
		// console.log($boardData);
		$boardData = allBoards[0];
	});
</script>

<Game />
