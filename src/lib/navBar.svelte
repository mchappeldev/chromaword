<script>
	import supabase from '../utils/supabase';
	import FaUser from 'svelte-icons/fa/FaUser.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';

	// @ts-ignore
	let loggedIn = supabase.auth.currentUser?.aud === 'authenticated';
</script>

<div class="navBar">
	<div class="icon"><FaBars /></div>
	<h1>ChromaWord</h1>
	<div class="icon"><a href={loggedIn ? '/profile' : '/login'}><FaUser /></a></div>
</div>

<style>
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
	}
</style>
