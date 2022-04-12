<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';
	import loadNextBoard from '../utils/boards/loadNextBoard.js';
	onMount(async () => {
		loadNextBoard();
	});
</script>

<Game />
