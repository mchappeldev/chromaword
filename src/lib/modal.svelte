<script>
	import { fade, scale } from 'svelte/transition';
	export let visible = true;
</script>

<div transition:fade={{ duration: 60 }} class="container" on:click|self={() => (visible = false)}>
	<div class="modal" transition:scale>
		<div class="cancel" on:click={() => (visible = false)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
				/></svg
			>
		</div>
		<slot />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap');

	.container {
		align-items: center;
		backdrop-filter: blur(2px);
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		height: 100vh;
		justify-content: center;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 1000;
	}
	.modal {
		align-items: center;
		background-color: white;
		border-radius: 0.3rem;
		box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
		color: #444;
		display: flex;
		flex-direction: column;
		max-height: 90vh;
		max-width: 90vw;
		overflow: scroll;
		position: relative;
		width: 40rem;
	}

	.modal::-webkit-scrollbar {
		display: none;
	}

	.cancel {
		cursor: pointer;
		font-size: 1.6rem;
		position: absolute;
		right: 1rem;
		top: 1rem;
		width: 2rem;
		color: #333;
	}
</style>
