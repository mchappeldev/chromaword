<script>
	import { boardValidation } from '../utils/boards/validateBoard';
	import { supabase } from '../utils/supabase';
	let boardId;
	let disableId;
	let valid;
	let invalidBoards = [];

	const disableBoard = async () => {
		await supabase.from('Boards').update({ disabled: true }).eq('id', disableId);
		await supabase.from('BoardsComplete').update({ success: true }).eq('boardId', disableId);
	};

	const validateAllBoards = async () => {
		invalidBoards = [];
		let { data, error } = await supabase.from('Boards').select('*');
		if (error) console.log(error);
		data.forEach((board) => {
			try {
				boardValidation(board.words, board.answers);
			} catch (error) {
				if (error === 'Invalid') {
					invalidBoards.push(board);
				}
			}
		});
		invalidBoards = invalidBoards;
	};

	const validateBoard = async () => {
		let { data, error } = await supabase
			.from('Boards')
			.select('*')
			.eq('id', boardId)
			.limit(1)
			.single();
		if (error) console.log(error);
		try {
			boardValidation(data.words, data.answers);
			valid = 'valid';
		} catch (error) {
			if (error === 'Invalid') valid = 'Invalid';
		}
	};
</script>

<h1>Disable Board</h1>
<input bind:value={disableId} />
<button on:click={disableBoard}>Disable</button>

<h1>Validate Single</h1>
<input bind:value={boardId} />
<button on:click={validateBoard}>Check</button>
<div>Board is: {valid ?? ''}</div>

<h1>Validate All Boards</h1>
<button on:click={validateAllBoards}>Check All </button>
<ul>
	{#each invalidBoards as board}
		<li>Board ID: {board.id} Disabled: {board.disabled}</li>
	{/each}
</ul>
