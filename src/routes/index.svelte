<script>
	import Board from '../lib/board.svelte';
</script>

<div class="main">
<h1> Svelte Word</h1>
<Board />
</div>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');
		@import url('https://fonts.googleapis.com/css2?family=Pavanam&display=swap');
		@import url('https://fonts.googleapis.com/css2?family=Passion+One&display=swap');
		body {
			font-family: 'Open Sans', sans-serif;
		}
		main {
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		

	</style>
</svelte:head>

