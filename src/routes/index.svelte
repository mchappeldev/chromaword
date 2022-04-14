<script>
	import { browser } from '$app/env';
	import { boardData } from '../store';

	// @ts-nocheck
	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';
	import LoadNextBoard from '../utils/boards/loadNextBoard.svelte';
	let nextBoard;

	onMount(async () => {
		if (browser) {
			if (!$boardData?.boardAnswers?.length) await nextBoard.load();
		}
	});
</script>

<LoadNextBoard bind:this={nextBoard} />
<Game />
