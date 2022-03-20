<script>
	import { getBoard } from '../utils/boardGenerator.js';
	let boards = [];
	const createNewBoard = () => {
		// const { wordArray, answers } = getBoard();
		boards.push({});
	};
</script>

<div>Hello world</div>

<button on:click={() => createNewBoard()}>Create</button>
