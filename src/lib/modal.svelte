<script>
	import { showModal, modalData } from '../store.js';
	import { fade, scale } from 'svelte/transition';
</script>

<div
	transition:fade={{ duration: 200 }}
	class="container"
	on:click|self={() => showModal.set(false)}
>
	<div class="modal" transition:scale={{ duration: 200 }}>
		<div class="cancel" on:click={() => showModal.set(false)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
				/></svg
			>
		</div>
		<div class="header">{$modalData.header}</div>
		<div class="message">{$modalData.message}</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap');
	.container {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(2px);
		left: 0;
		top: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.modal {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		background-color: white;
		width: 40rem;
		border-radius: 0.3rem;
		box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
		color: #444;
	}
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
	.cancel {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 1.6rem;
		cursor: pointer;
		width: 2rem;
	}
</style>
