<script>
	import { browser } from '$app/env';
	import { boardData } from '../store';

	// @ts-nocheck
	import { onMount } from 'svelte';
	import Game from '../lib/game.svelte';
	import { load } from '../utils/boards/loadNextBoard.js';

	onMount(async () => {
		if (browser) {
			if (!$boardData?.boardAnswers?.length) await load();
		}
	});
</script>

<Game />
