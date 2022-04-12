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
	</div>
	<h1>ChromaWord</h1>
	<div class="right">
		<div class="icon"><a href={loggedIn ? '/profile' : '/login'}><FaUser /></a></div>
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
		width: 100px;
	}
	.right {
		width: 100px;
		display: flex;
		justify-content: end;
		gap: 10px;
	}
	h1 {
		/* width: 390px; */
		/* height: 50px; */
		margin-top: 0px;
		margin-bottom: 0px;

		font-family: 'Passion One';
		font-style: normal;
		font-weight: 400;
		font-size: min(10vw, 48px);
		/* line-height: 53px; */
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
		position: relative;
		z-index: 999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 600px;
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	.icon {
		width: 1.5rem;
		height: 1.5rem;
		color: #444;
		cursor: pointer;
	}
	a,
	a:hover,
	a:visited,
	a:active {
		color: inherit;
		text-decoration: none;
	}
</style>
