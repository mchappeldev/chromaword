<script>
	import { getBoard } from '../utils/boards/boardGenerator.js';
	let boards = [];
	const createNewBoard = () => {
		const board = getBoard();
		boards = [...boards, board];
		// boards.push(board);
	};
</script>

<button on:click={() => createNewBoard()}>Create</button>

<div class="container">
	<table class="table">
		<tr>
			<th>ID</th>
		</tr>
		{#each boards as board, i}
			<tr>
				<td>{i}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	.container {
		height: 100vh;
		width: 100vw;
	}
</style>
