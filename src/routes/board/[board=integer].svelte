<script>
	import { browser } from '$app/env';

	// @ts-nocheck
	import { onMount } from 'svelte';
	import Game from '$lib/game.svelte';
	import LoadNextBoard from '../../utils/boards/loadNextBoard.svelte';
	import { page } from '$app/stores';

	let nextBoard;

	onMount(async () => {
		if (browser) {
			await nextBoard.load(Number($page.params.board));
		}
	});
</script>

<LoadNextBoard bind:this={nextBoard} />
<Game />
