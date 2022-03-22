<script>
	import { guesses, boardData } from '../store.js';
	import { collection, getDocs, addDoc } from 'firebase/firestore';
	import { db } from '../utils/firebase';
	$: correct = $boardData.answersLetterArray.join('') == $guesses.join('').toLowerCase();

	const saveBoard = async () => {
		const docRef = await addDoc(collection(db, 'boards'), $boardData);
	};
</script>

<div class="header">{correct ? 'You won!' : 'You lost!'}</div>
<div class="message">
	{#if correct}
		<p>
			{`You correctly guessed the following: ${$boardData.answersLetterArray} That is awesome!`}
		</p>
	{:else}
		<p>
			{`You guessed the following: ${$guesses} and it was actually: ${$boardData.answersLetterArray}! The words were ${$boardData.wordArray}.`}
		</p>
	{/if}
</div>
<button on:click={saveBoard}>Save Board</button>

<style>
	.header {
		font-family: 'Open Sans';
		font-weight: 600;
		font-size: 1.75rem;
		margin-top: 1.5rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.message {
		font-family: 'Open Sans';
		font-weight: 400;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-bottom: 3rem;
	}
</style>
