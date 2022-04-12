<script>
	import { supabase } from '../utils/supabase';
	import FaUser from 'svelte-icons/fa/FaUser.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import FaQuestionCircle from 'svelte-icons/fa/FaQuestionCircle.svelte';
	import Instructions from '$lib/instructions.svelte';
	import Modal from '$lib/modal.svelte';

	// @ts-ignore
	let loggedIn = supabase.auth.currentUser?.aud === 'authenticated';
	let showInstructions = false;
</script>

<div class="navBar">
	<div class="left">
		<!-- <div class="icon"><FaBars /></div> -->
		<div class="icon"><a href={loggedIn ? '/profile' : '/login'}><FaUser /></a></div>
	</div>
	<h1>ChromaWord</h1>
	<div class="right">
		<div class="icon" on:click={() => (showInstructions = true)}><FaQuestionCircle /></div>
	</div>
	{#if showInstructions}
		<Modal bind:visible={showInstructions}>
			<Instructions bind:visible={showInstructions} />
		</Modal>
	{/if}
</div>

<style>
	.left {
		margin-left: 10px;
		width: 100px;
	}
	.right {
		display: flex;
		gap: 10px;
		justify-content: end;
		margin-right: 10px;
		width: 100px;
	}
	h1 {
		/* height: 50px; */
		/* line-height: 53px; */
		/* width: 390px; */
		font-family: 'Passion One';
		font-size: min(10vw, 48px);
		font-style: normal;
		font-weight: 400;
		margin-bottom: 0px;
		margin-top: 0px;
		text-align: center;
		text-transform: uppercase;

		background: linear-gradient(
			90deg,
			#e57878 24.62%,
			#e59978 34.09%,
			#e5da78 44.08%,
			#6fcf96 54.34%,
			#78b7e5 64.34%,
			#bf7dd6 75.13%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.navBar {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		margin-top: 1rem;
		max-width: 600px;
		position: relative;
		width: 100%;
		z-index: 999;
	}
	.icon {
		color: #444;
		cursor: pointer;
		height: 1.5rem;
		width: 1.5rem;
	}
</style>
